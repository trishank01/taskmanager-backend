require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connect } = require("http2");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const reportRoutes = require("./routes/reportRoutes")


const app = express()



// Middleware to handle CORS

app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods: ["GET" , "POST" , "PUT" , "DELETE"],
        allowedHeaders: ["Content-Type" ,"Authorization"],
    })
);


//Connect Database



let dbConnected = false;

connectDB().then(success => {
  dbConnected = success;
});
//Middleware
app.use(express.json())


//Routes
 app.use("/api/auth" , authRoutes);
 app.use("/api/users" , userRoutes);
 app.use("/api/tasks" , taskRoutes);
 app.use("/api/reports" , reportRoutes);


 app.get("/test", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test Route</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f8ff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            text-align: center;
            padding: 2rem;
            border: 2px solid #4caf50;
            border-radius: 10px;
            background-color: #e8f5e9;
            color: #2e7d32;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.25rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Success!</h1>
          <p>Your Node.js app is deployed and running correctly.</p>
        </div>
      </body>
    </html>
  `);
});



//Server uploads folder

app.use("/uploads" , express.static(path.join(__dirname , "uploads")));

// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))