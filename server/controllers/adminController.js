import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// ✅ Admin login controller function
export const adminLogin = async (req, res) => {
    try {
        // 📨 Request se email aur password nikaal rahe hain
        const { email, password } = req.body;

        // 🔐 Admin credentials ko check kar rahe hain (env file se)
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            // ❌ Agar email ya password galat hai, toh error bhej rahe hain
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        // ✅ Agar credentials sahi hain, toh JWT token generate kar rahe hain
        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        // 🟢 Token ke sath response bhej rahe hain
        res.json({ success: true, token: token });

    } catch (error) {
        // ⚠️ Agar koi unexpected error aata hai, toh uska message bhej rahe hain
        res.json({ success: false, message: error.message });
    }
}

// ✅ Saare blogs ko fetch karne wali API
export const getAllBlogs = async (req, res) => {
   try {
     // 🔍 Database se saare blogs laa rahe hain, aur latest pehle dikhane ke liye sort kar rahe hain
     const blogs = await Blog.find({}).sort({ createdAt: -1 });

     // 📤 Response bhej rahe hain client ko
     res.json({ success: true, blogs });

   } catch (error) {
     // ❌ Agar koi error aaye to uska message bhej rahe hain
     res.json({ success: false, message: error.message });
   }
};

// ✅ Saare comments fetch karne wali API
export const getAllComments = async (req, res) => {
    try {
        // 🔍 Comments laa rahe hain aur blog ke saare data ko populate kar rahe hain (foreign key ke jaise)
        const comments = await Comment.find({})
            .populate("blog") // ⚡ Ye blog field ko pura blog object me convert karega
            .sort({ createdAt: -1 }); // ⏱️ Latest comment pehle aayega

        // 📤 Response bhej rahe hain client ko
        res.json({ success: true, comments });

    } catch (error) {
        // ❌ Agar koi error aaye to uska message bhej rahe hain
        res.json({ success: false, message: error.message });
    }
};

export const getDashboard = async (req,res) => {
   try {
     const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({isPublished: false});
    const dashboardData = {
        blogs, comments, drafts, recentBlogs
    }
    res.json({success: true, dashboardData})
    
   } catch (error) {
     res.json({ success: false, message: error.message });
    
   }

}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body; // 🧾 Comment ka ID client se le rahe hain
        await Comment.findByIdAndDelete(id); // 🗑️ Comment ko database se delete kar rahe hain

        res.json({ success: true, message: "Comment deleted successfully" }); // ✅ Success response
    } catch (error) {
        res.json({ success: false, message: error.message }); // ❌ Error response agar kuch galat ho
    }
};

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body; // 🧾 ID le rahe hain request body se

        // ✅ Comment ko approve kar rahe hain (isApproved ko true set karke)
        await Comment.findByIdAndUpdate(id, { isApproved: true });

        res.json({ success: true, message: "Comment approved successfully" }); // ✅ Success message
    } catch (error) {
        res.json({ success: false, message: error.message }); // ❌ Error handling
    }
};





