import cors from "cors";
import express from "express";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api", (_request, response) => {
  response.json({
    service: "FinOs backend",
    version: "0.1.0",
  });
});