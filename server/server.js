
const express = require('express')
const mongoose = require("mongoose");
const app = express()

const cors = require('cors')
const cookieParser =require('cookie-parser')

mongoose.connect(
  "mongodb+srv://charanreddykunduru123:charan123@cluster0.gh2dw.mongodb.net/"
).then(() => {
    console.log("connected sucessfully");
    
}).catch((error) => {
    console.log(error);
});


app.use(
  cors({
      origin: "http://localhost:5173/",
      methods: ['GET', 'POST', 'DELETE', 'PUT'],
      allowedHeaders: [
          "content-Type",
          "Authorization",
          'Cache-Control',
          'Expires',
          'Pragma'
      ],
      credentials:true
  })
);

app.use(cookieParser());
app.use(express.json())





const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    
})