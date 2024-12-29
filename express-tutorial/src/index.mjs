import express from "express";
import routes from "./routes/index.mjs";
import { loggingMiddleware } from "./utils/middlewares.mjs";

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get("/", loggingMiddleware, (request, response) => {
  response.status(201).send({ msg: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
