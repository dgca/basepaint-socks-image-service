import { readFileSync } from "node:fs";
import { join } from "node:path";

function getBase64Image(filename: string): string {
  const fullPath = join(import.meta.dir, filename);
  const imageBuffer = readFileSync(fullPath);
  const base64Image = imageBuffer.toString("base64");
  return `data:image/png;base64,${base64Image}`;
}

export const images = {
  logo: getBase64Image("logo.png"),
  bottomPattern: getBase64Image("bottom-pattern.png"),
};
