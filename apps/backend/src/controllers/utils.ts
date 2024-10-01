import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

// S3 Configuration (Replace with your MinIO or AWS S3 credentials)
const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT || "http://localhost:9000", // MinIO server address
  region: "us-east-1", // MinIO doesn't require a specific region, but the SDK needs one
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || "root",
    secretAccessKey: process.env.MINIO_SECRET_KEY || "rootroot",
  },
  forcePathStyle: true, // Needed for MinIO
});

// Your bucket name
const BUCKET_NAME = "opencloud";

// Function to upload a single file to S3
const uploadFileToS3 = async (filePath: string, s3Key: string) => {
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: s3Key, // The key in the bucket (file name + folder structure if needed)
    Body: fileStream, // The file to upload
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    console.log(`File uploaded successfully: ${s3Key}`);
  } catch (err) {
    console.error(`Error uploading ${s3Key}:`, err);
  }
};

// Function to upload all files in a local directory to S3
 const uploadDirectoryToS3 = async (localDirPath: string, s3FolderKey: string) => {
  try {
    const files = fs.readdirSync(localDirPath);

    for (const file of files) {
      const fullPath = path.join(localDirPath, file);
      const fileStat = fs.statSync(fullPath);

      if (fileStat.isFile()) {
        // Construct the S3 key (folder + file name)
        const s3Key = path.join(s3FolderKey, file).replace(/\\/g, "/");
        await uploadFileToS3(fullPath, s3Key);
      } else if (fileStat.isDirectory()) {
        // Recursively upload the directory's contents
        const subFolderKey = path.join(s3FolderKey, file).replace(/\\/g, "/");
        await uploadDirectoryToS3(fullPath, subFolderKey);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};

// // Main execution: define your local directory and the S3 folder
// const localDirectory = path.resolve(__dirname, "../templates"); // Change to your local directory path
// const s3FolderKey = "templates"; // Folder in S3 to upload to

// // Upload the local directory to S3
// uploadDirectoryToS3(localDirectory, s3FolderKey)
//   .then(() => console.log("All files uploaded successfully."))
//   .catch((err) => console.error("Error uploading files:", err));

export {uploadDirectoryToS3};