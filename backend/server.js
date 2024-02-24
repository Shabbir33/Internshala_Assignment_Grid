require("dotenv").config();
const express = require("express");
const imgRouter = require("./routes/imgRouter");
const connectDB = require("./db/connect");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", imgRouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
