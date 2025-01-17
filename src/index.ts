import express, { Request, Response } from "express";
import errorHandlerMiddleware from "./error/errorHandler";
import userRoutes from "./router/user";
import taskRoutes from "./router/task";
import loginRoute from "./router/login";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/login", loginRoute);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
