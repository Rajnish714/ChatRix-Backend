import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./src/midlleware/errorHandler.middleware.js";
import api from "./src/routes/api.js"; 

const allowedOrigins = process.env.CORS_ORIGINS.split(",");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));


app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/assets", express.static("public/assets"));
app.use("/v1", api);
app.use(globalErrorHandler)

export default app;
