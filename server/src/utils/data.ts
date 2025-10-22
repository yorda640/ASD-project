import fs from "fs/promises";
import path from "path";
const dataPath = path.join(__dirname, "../data");

export async function readData<T>(fileName: string): Promise<T> {
  try {
    const filePath = path.join(dataPath, fileName);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (e: any) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      await fs.mkdir(dataPath, { recursive: true });
      await fs.writeFile(path.join(dataPath, fileName), "[]", "utf-8");
      return [] as unknown as T;
    }
    throw e;
  }
}

export async function writeData<T>(fileName: string, data: T): Promise<void> {
  const filePath = path.join(dataPath, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
