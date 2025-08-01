// Express module ko import kar rahe hain
import express from 'express';

// 👇 blogController se addBlog function ko import kar rahe hain (default export hai, isliye braces nahi hain)
import addBlog, { addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComment, togglePublish } from '../controllers/blogController.js';

// File upload handle karne ke liye multer middleware import kar rahe hain
import upload from '../middleware/multer.js';

// JWT auth middleware import kar rahe hain jo user ko verify karega
import auth from '../middleware/auth.js';

// Express ka Router object create kar rahe hain taaki blog se related routes manage ho sakein
const blogRouter = express.Router();

// POST route define kar rahe hain blog add karne ke liye
// upload.single('image') → image file handle karega
// auth → token verify karega
// addBlog → blog ko database me add karega
blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);

//Comments
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComment);

//gemini
blogRouter.post('/generate', auth, generateContent);

// Is router ko export kar rahe hain taaki ise server.js me import kar sakein
export default blogRouter;
