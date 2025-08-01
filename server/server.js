import express from 'express';
import 'dotenv/config'; // ✅ This auto-runs dotenv.config()
import cors from 'cors';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import { connectToDatabase } from './configs/db.js';

const app = express();

await connectToDatabase(); // ✅ Make sure this is inside top-level await OR wrap in async IIFE

// Middlewares
app.use(cors());
app.use(express.json());

//Network error
app.use(cors({
    origin: 'http://localhost:5174', // allow your frontend
    credentials: true
  }));
  

// Routes
app.get("/", (req, res) => {
    res.send("App is working");
});
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("✅ Server is listening on PORT: " + PORT);
});
