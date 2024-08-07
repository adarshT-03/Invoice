const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const businessRouter = require("./routes/businessRoutes");
const clientRouter = require("./routes/clientRoutes");
const itemRouter = require("./routes/itemRoutes");
const invoiceRouter = require("./routes/invoiceRoutes");
const { pool } = require("./database/db");
const cors = require("cors");
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());
// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/users", userRouter);
app.use("/business", businessRouter);
app.use("/client", clientRouter);
app.use("/item", itemRouter);
app.use("/invoice", invoiceRouter);
app.use('/payments', paymentRoutes);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
  connection.release();
});

//handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
