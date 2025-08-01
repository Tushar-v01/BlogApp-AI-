import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
function CommentTable({ comment, fetchComments }) {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const {axios} = useAppContext();

 const approveComment = async () => {
  try {
    // ✅ Admin approval ke liye POST request bhej rahe hain backend ko
    const { data } = await axios.post('/api/admin/approve-comment', { 
      id: _id // 🆔 Ye comment ka unique ID hai jisko approve karna hai 
    });

    if (data.success) {
      toast.success(data.message); // 🎉 Agar approval successful ho gaya toh success message dikhaye
      fetchComments(); // 🔄 Comments list dubara fetch karo taaki UI update ho
    } else {
      toast.error(data.message); // ❌ Backend se koi issue aaya toh error message dikhao
    }

  } catch (error) {
    // ⚠️ Network ya server error ke case me yeh catch block chalega
    toast.error(error.message); // 🔔 Error message user ko show karo
  }
};

const deleteComment = async () => {
  try {
    // ⚠️ User se confirmation le rahe hain — kya sach me delete karna chahte ho?
    const confirm = window.confirm('Are you sure you want to delete this comment?');

    if (!confirm) return; // ❎ Agar user ne cancel kiya, toh function yahin ruk jaayega

    // 🚀 Delete request backend ko bhej rahe hain comment ID ke saath
    const { data } = await axios.post('/api/admin/delete-comment', { id: _id });

    if (data.success) {
      toast.success(data.message); // ✅ Agar delete successful hua, success message dikhao
      fetchComments(); // 🔄 UI update ke liye comments list dobara fetch karo
    } else {
      toast.error(data.message); // ❌ Backend ne failure message bheja toh error dikhao
    }

  } catch (error) {
    // 🔥 Network/server error aaya toh catch block chalega
    toast.error(error.message); // 🚨 Error message user ko show karo
  }
};



  return (
    <tr className="border-y border-gray-200 hover:bg-gray-50 transition">
      <td className="px-6 py-4 text-sm text-gray-700 leading-6">
        <div className="space-y-1">
          <div>
            <b className="text-gray-600">Blog:</b> {blog.title}
          </div>
          <div>
            <b className="text-gray-600">Name:</b> {comment.name}
          </div>
          <div>
            <b className="text-gray-600">Comment:</b> {comment.content}
          </div>
        </div>
      </td>

      <td className="px-6 py-4 max-sm:hidden text-sm text-gray-600">
        {BlogDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {!comment.isApproved ? (
            <img
            onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve"
              title="Approve"
              className="w-6 h-6 hover:scale-110 transition-transform duration-200 cursor-pointer"
            />
          ) : (
            <span className="text-xs font-medium border border-green-600 bg-green-100 text-green-700 rounded-full px-3 py-1">
              Approved
            </span>
          )}

          <img
          onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            title="Delete"
            className="w-6 h-6 hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
}

export default CommentTable;
