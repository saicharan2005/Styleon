require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authRouter = require("./routes/auth/auth-routes");
const adminProductRouter = require("./routes/admin/products-routes")
const shopProductRouter=require("./routes/shop/products-routes")

const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("connected sucessfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter)
app.use("/api/shop/products",shopProductRouter)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
