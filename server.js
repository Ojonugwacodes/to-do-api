require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

connectDB();

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "Todo API running" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => console.log(`Server running on port ${port}`));



//1. Load environment variables
//2. Create Express app
//3. Enable JSON parsing
//4. Connect to database
//5. Register routes
//6. Start server