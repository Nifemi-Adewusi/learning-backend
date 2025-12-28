import express from "express";

import userRouter from "./routes/user.routes.js";

// Create an express app
const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

export default app;
