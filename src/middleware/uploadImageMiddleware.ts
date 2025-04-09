import multer from "multer";

// Konfigurasi penyimpanan memori untuk multer
const storage = multer.memoryStorage();

// Batasan ukuran file (500KB max)
const fileFilter = (req: any, file: any, cb: any) => {
  // Hanya izinkan format gambar
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

// Konfigurasi multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024, // 500KB (500 * 1024 bytes)
  },
  fileFilter: fileFilter,
});

export default upload;
