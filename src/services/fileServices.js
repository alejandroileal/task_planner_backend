import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, "../../uploads");

export async function initializeUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

export async function uploadFile(file) {
  const filePath = path.join(uploadDir, file.originalname);
  await fs.writeFile(filePath, file.buffer);
  return file.originalname;
}

export async function downloadFile(filename) {
  const filePath = path.join(uploadDir, filename);
  return await fs.readFile(filePath);
}

export async function listFiles() {
  return await fs.readdir(uploadDir);
}

export async function deleteFile(filename) {
  const filePath = path.join(uploadDir, filename);
  await fs.unlink(filePath);
}

initializeUploadDir();

export default { uploadFile };
