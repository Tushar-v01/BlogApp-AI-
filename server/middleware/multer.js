// Multer module ko import kar rahe hain - ye file uploads handle karta hai
import multer from 'multer';

// Storage configuration set kar rahe hain (yaha hum default disk storage use kar rahe hain bina kisi custom path ke)
const upload = multer({
  storage: multer.diskStorage({})  // Yeh storage setting files ko temp folder me store karega
});

// Is middleware ko export kar rahe hain taaki hum ise route me use kar sake file upload ke liye
export default upload;
