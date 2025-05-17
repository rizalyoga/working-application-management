import multer from "multer";

// Konfigurasi penyimpanan memori untuk multer
const storage = multer.memoryStorage();

// Filter untuk file PDF
const pdfFileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Konfigurasi multer untuk PDF
const uploadPdf = multer({
  storage: storage,
  limits: {
    fileSize: 2048 * 1024, // 1MB
  },
  fileFilter: pdfFileFilter,
});

export default uploadPdf;
