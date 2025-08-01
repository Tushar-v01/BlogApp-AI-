
// ✅ Express import kar rahe hain
import express from 'express';

// ✅ Admin login controller import kar rahe hain
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogs, getAllComments, getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

// ✅ Router banaya gaya hai admin ke liye
const adminRouter = express.Router();

// 🔐 Jab bhi POST request /login pe aaye, adminLogin function chalega
adminRouter.post('/login', adminLogin);

// ✅ Saare comments ko fetch karne wala route (Admin panel ke liye)
adminRouter.get('/comments', auth, getAllComments);

// ✅ Saare blogs ko fetch karne wala route (Published/unpublished dono)
adminRouter.get('/blogs', auth, getAllBlogs);

// 🗑️ Kisi ek comment ko delete karne wala route (Admin only)
adminRouter.post('/delete-comment', auth, deleteCommentById);

// ✅ Kisi comment ko approve karne wala route (Admin approval system)
adminRouter.post('/approve-comment', auth, approveCommentById);

// 📊 Dashboard ke liye summary data laane wala route (Stats, counts, etc.)
adminRouter.get('/dashboard', auth, getDashboard);



// ✅ Is router ko export kar rahe hain taaki app.js ya index.js me use ho sake
export default adminRouter;
