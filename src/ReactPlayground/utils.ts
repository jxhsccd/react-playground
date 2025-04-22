import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface FileContent {
  value: string;
}

interface Files {
  [name: string]: FileContent;
}


export async function downloadFiles(files: Files): Promise<void> {
  const zip = new JSZip();

  // 遍历文件对象，将每个文件添加到ZIP中
  Object.entries(files).forEach(([name, file]) => {
    if (file?.value) {
      zip.file(name, file.value);
    }
  });

  try {
    // 生成ZIP文件并下载
    const blob = await zip.generateAsync({ type: "blob" });
    const randomSuffix = Math.random().toString().slice(2, 8);
    saveAs(blob, `code_${randomSuffix}.zip`);
  } catch (error) {
    console.error("Failed to generate or download ZIP file:", error);
    throw error;
  }
}


export const fileName2Language = (name: string): string => {
  const suffix = name.split(".").pop()?.toLowerCase() || "";
  
  // 根据文件后缀返回对应的语言类型
  switch (suffix) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "json":
      return "json";
    case "css":
      return "css";
    default:
      return "javascript"; // 默认返回javascript
  }
};


export function compress(data: string): string {
  try {
    const buffer = strToU8(data);
    const zipped = zlibSync(buffer, { level: 9 }); // 使用最高压缩级别
    const str = strFromU8(zipped, true);
    return btoa(str); // 转换为Base64
  } catch (error) {
    console.error("Compression failed:", error);
    throw error;
  }
}


export function uncompress(base64: string): string {
  try {
    const binary = atob(base64);
    const buffer = strToU8(binary, true);
    const unzipped = unzlibSync(buffer);
    return strFromU8(unzipped);
  } catch (error) {
    console.error("Decompression failed:", error);
    throw error;
  }
}