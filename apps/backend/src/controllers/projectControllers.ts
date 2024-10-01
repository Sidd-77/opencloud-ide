import { Request, Response } from "express";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

// S3 Client Configuration
const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT || "http://localhost:9000", // Replace with your MinIO server address
  region: "us-east-1", // MinIO doesn't require a specific region, but the SDK needs one
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || "root",
    secretAccessKey: process.env.MINIO_SECRET_KEY || "rootroot",
  },
  forcePathStyle: true, // Needed for MinIO
});

const BUCKET_NAME = "opencloud";
const LOCAL_TEMPLATES_DIR = path.resolve(__dirname, "../templates"); // Path to the local templates directory

// Controller for handling REPL requests
export const handleReplRequest = async (req: Request, res: Response) => {
  console.log(req.body);
  const { replId, stackId } = req.body;
  const TEMPLATE_KEY = `templates/${stackId}/`;

  if (!replId) {
    return res.status(400).json({ error: "Missing replId parameter" });
  }

  const folderKey = `repls/${replId}/`;

  try {
    // Check if the folder exists in S3
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: BUCKET_NAME,
        Key: folderKey,
      })
    );

    // If the folder exists, return a message
    return res.json({ message: "REPL folder already exists", replId });
  } catch (error: any) {
    // If the folder doesn't exist, proceed with creation and file copying
    if (error.$metadata?.httpStatusCode !== 404) {
      console.error("Error checking folder:", error);
      return res.status(500).json({ error: "An unexpected error occurred" });
    }

    // Folder doesn't exist, create it and copy template files
    try {
      // Create an empty folder in S3
      await createEmptyFolder(folderKey);

      // Upload local template files to S3
      const localTemplatePath = path.join(LOCAL_TEMPLATES_DIR, stackId); // Path to local template folder for this stackId
      await uploadDirectoryToS3(localTemplatePath, folderKey);

      return res.json({
        message: "REPL folder created and template copied",
        replId,
      });
    } catch (createError) {
      console.error("Error creating folder or copying template:", createError);
      return res.status(500).json({ error: "Failed to create REPL folder" });
    }
  }
};

// Function to create an empty folder in S3
async function createEmptyFolder(key: string): Promise<void> {
  const emptyStream = new Readable({
    read() {
      this.push(null);
    },
  });

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: emptyStream,
    },
  });

  await upload.done();
}

// Function to upload files from local directory to S3
async function uploadDirectoryToS3(localDirPath: string, s3FolderKey: string) {
  try {
    const files = fs.readdirSync(localDirPath);

    for (const file of files) {
      const fullPath = path.join(localDirPath, file);
      const fileStat = fs.statSync(fullPath);

      if (fileStat.isFile()) {
        // Construct the S3 key (folder + file name)
        const s3Key = path.join(s3FolderKey, file).replace(/\\/g, "/");

        // Upload file to S3 using Upload from @aws-sdk/lib-storage
        await uploadFileToS3(fullPath, s3Key);
      } else if (fileStat.isDirectory()) {
        // If it's a directory, recursively upload its contents
        const subFolderKey = path.join(s3FolderKey, file).replace(/\\/g, "/");
        await uploadDirectoryToS3(fullPath, subFolderKey);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
    throw new Error("Failed to upload directory to S3");
  }
}

// Function to upload a single file to S3 using Upload from @aws-sdk/lib-storage
async function uploadFileToS3(filePath: string, s3Key: string) {
  const fileStream = fs.createReadStream(filePath);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileStream,
    },
  });

  try {
    await upload.done();
    console.log(`File uploaded successfully: ${s3Key}`);
  } catch (err) {
    console.error(`Error uploading ${s3Key}:`, err);
    throw new Error("Failed to upload file to S3");
  }
}
