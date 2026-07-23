import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import healthModule from "./modules/health/index.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import  authRoutes  from "./modules/auth/auth.routes.js";
import goalRoutes from "./modules/learning/goals/goals.routes.js";
import roadmapRoutes from "./modules/learning/roadmap/roadmap.routes.js";
import lessonRoutes from "./modules/learning/lessons/lesson.routes.js";
import progressRoutes from "./modules/learning/progress/progress.routes.js";
import quizRoutes from "./modules/learning/quizzes/quiz.routes.js";
import tutorRoutes from "./modules/learning/tutor/tutor.routes.js";
import adaptiveRoutes from "./modules/learning/adaptive/adaptive.routes.js";
const app = express();
// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Routes
app.use("/api/v1/health", healthModule);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/goals", goalRoutes);
app.use("/api/v1/roadmaps", roadmapRoutes);
app.use("/api/v1/lessons", lessonRoutes);
app.use("/api/v1/progress", progressRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/tutor", tutorRoutes);
app.use("/api/v1/adaptive", adaptiveRoutes);
// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Adaptive Tutor AI Backend is Running 🚀",
  });
});

// 404 (ALWAYS LAST)
app.use(notFoundMiddleware);

// Error Handler (ABSOLUTELY LAST)
app.use(errorMiddleware);

export default app;