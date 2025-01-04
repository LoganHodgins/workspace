import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import { loggingMiddleware } from "./utils/middlewares.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get("/", loggingMiddleware, (request, response) => {
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
