// index.js (ESM)
import express from "express";
import memeRoutes from "./routes/memeRoutes.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(express.json());

// Mount feature routers BEFORE any 404 handler
app.use("/memes", memeRoutes);
app.use("/users", usersRouter);

// health-check (optional)
app.get("/", (_req, res) => res.json({ ok: true }));

// last: 404 + error handlers
app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

