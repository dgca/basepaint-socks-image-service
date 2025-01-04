import * as fs from "fs";
import * as path from "path";

export function getBase64Image(imagePath: string): string {
  const fullPath = path.join(process.cwd(), "assets", imagePath);
  const imageBuffer = fs.readFileSync(fullPath);
  const base64Image = imageBuffer.toString("base64");
  const mimeType = imagePath.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${mimeType};base64,${base64Image}`;
}
