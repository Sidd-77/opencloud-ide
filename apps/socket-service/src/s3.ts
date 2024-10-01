import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

// Configure the S3 Client
const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT || "http://localhost:9000", // MinIO server address
  region: "us-east-1", // MinIO doesn't require a specific region, but the SDK needs one
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || "root",
    secretAccessKey: process.env.MINIO_SECRET_KEY || "rootroot",
  },
  forcePathStyle: true, // Needed for MinIO
});

const BUCKET_NAME = "opencloud"; // Your S3 bucket name
const LOCAL_DOWNLOAD_DIR = "/home/sidd/app"; // Local directory to download files to

// Utility function to download files from S3 to local directory
async function downloadFileFromS3(s3Key: string, localFilePath: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key,
  });

  const response = await s3Client.send(command);

  // Create a writable stream to save the file locally
  const fileStream = fs.createWriteStream(localFilePath);

  // Pipe the response body to the file stream
  await promisify(pipeline)(response.Body as NodeJS.ReadableStream, fileStream);
  console.log(`Downloaded ${s3Key} to ${localFilePath}`);
}

// Function to download all files in a specified S3 folder to local directory
async function downloadDirectoryFromS3(prefix: string) {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: prefix,
  });

  const response = await s3Client.send(command);

  if (response.Contents) {
    for (const object of response.Contents) {
      if (object.Key) {
        const localFilePath = path.join(
          LOCAL_DOWNLOAD_DIR,
          object.Key.replace(prefix, "")
        );

        // Ensure the local directory exists
        const localDirPath = path.dirname(localFilePath);
        fs.mkdirSync(localDirPath, { recursive: true });

        // Only download files, not directories
        if (!object.Key.endsWith("/")) {
          // Skip if the key represents a "directory"
          await downloadFileFromS3(object.Key, localFilePath);
        }
      }
    }
  } else {
    console.log("No files found in the specified S3 bucket.");
  }
}

async function uploadFileToS3(localFilePath: string, s3Key: string) {
  const fileStream = fs.createReadStream(localFilePath);

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key,
    Body: fileStream,
  });

  await s3Client.send(command);
  console.log(`Uploaded ${localFilePath} to ${s3Key}`);
}

// Function to recursively upload all files in a specified local directory to S3
async function uploadDirectoryToS3(localDirPath: string, s3Prefix: string) {
  const files = fs.readdirSync(localDirPath);

  for (const file of files) {
    const localFilePath = path.join(localDirPath, file);
    const s3Key = path
      .join(s3Prefix, path.relative(LOCAL_DOWNLOAD_DIR, localFilePath))
      .replace(/\\/g, "/"); // Create S3 key with correct prefix and format

    if (fs.statSync(localFilePath).isDirectory()) {
      // If it's a directory, recurse into it
      await uploadDirectoryToS3(localFilePath, s3Key);
    } else {
      // If it's a file, upload it
      await uploadFileToS3(localFilePath, s3Key);
    }
  }
}

// Entry point to start uploading files
async function uploadS3Folder(key: string) {
  const s3Prefix = `repls/${key}`;
  await uploadDirectoryToS3(LOCAL_DOWNLOAD_DIR, "repls/kidd");
}

// Entry point to start downloading files
async function fetchS3Folder(key: string) {
  const s3Prefix = `repls/${key}`; // Specify the prefix (folder) in S3 you want to download
  await downloadDirectoryFromS3(s3Prefix);
}

export { fetchS3Folder, uploadS3Folder };
