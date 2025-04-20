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
connectDB()

//Middleware
app.use(express.json())


//Routes
 app.use("/api/auth" , authRoutes);
 app.use("/api/users" , userRoutes);
 //app.use("/api/tasks" , taskRoutes);
 //app.use("/api/reports" , reportRoutes);

// app.get('/', (req, res) => {
//     res.send('Go to <a href="/check">/check</a> to see the HTML response.');
//   });

//   // Route: GET /check
// app.get('/check', (req, res) => {
//     res.send(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Check Route</title>
//         </head>
//         <body style="font-family: Arial; text-align: center; padding: 50px;">
//           <h1>🚀 Node.js with Express is Working!</h1>
//           <p>This is the <strong>/check</strong> route response.</p>
//         </body>
//       </html>
//     `);
//   });


// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))