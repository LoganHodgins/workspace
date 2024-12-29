import express from "express";
import {
  query,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "logan", displayName: "Logan" },
  { id: 2, username: "alice", displayName: "Alice" },
  { id: 3, username: "bob", displayName: "Bob" },
];

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;
  next();
};

//app.use(loggingMiddleware); // user middleware globally, will be called for each function

// base route
app.get("/", loggingMiddleware, (request, response) => {
  response.status(201).send({ msg: "Hello World!" });
});

// common practice
app.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be emtpy")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters"),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    const {
      query: { filter, value },
    } = request;
    if (filter && value)
      return response
        .status(201)
        .send(mockUsers.filter((user) => user[filter].includes(value)));
    return response.status(201).send(mockUsers);
  }
);

app.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    console.log(newUser);
    mockUsers.push(newUser);
    return response.status(200).send(newUser);
  }
);

app.get("/api/products", (request, response) => {
  response
    .status(201)
    .send({ products: [{ id: 1, product: "Lamp", price: 12.99 }] });
});

app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

// create an express app, then call listen on the port we want our server to run on
// request hold all information about the user who made the request
// response holds information about the response and allows us to respond to requests

// route parameters have a path like /api/users/:id/:username we can have multiple route
// routes are then passed as an object that can be accessed through request.params
// route objects have string values

// query string /api/users?key=value&key2=value2
// request.query

// curl http://localhost:3000/api/users

// curl -H 'Content-Type: application/json' \
// -d '{"username": "logan", "age": 25}' \
// -X POST \
// http://localhost:3000/api/users

// curl -H 'Content-Type: application/json' \
// -d '{"username": "allie", "displayName": "alice"}' \
// -X PUT \
// http://localhost:3000/api/users/2

// curl -H 'Content-Type: application/json' \
// -d '{"username": "allie"}' \
// -X PATCH \
// http://localhost:3000/api/users/2

// curl -X DELETE http://localhost:3000/api/users/2
