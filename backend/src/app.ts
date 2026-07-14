import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import healthModule from "./modules/health/index.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

//Security_Middleware
app.use(helmet());
//CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie Parser middleware
app.use(cookieParser());
app.use(notFoundMiddleware);

app.use(errorMiddleware);
app.use("/api/v1/health", healthModule);






//health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Adaptive Tutor AI Backend is Running 🚀",
  });
});

export default app;