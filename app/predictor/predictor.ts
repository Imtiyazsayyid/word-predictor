"use server";

import { exec } from "child_process";

export default async function predictWord(model: string, input: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Use the correct path for macOS
    const pythonExecutable = "./venv/bin/python";
    const command = `"${pythonExecutable}" app.py "${model}" "${input}"`;

    exec(command, { cwd: "./model" }, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing command:", error);
        return reject(error);
      }
      console.log("Script output:", stdout);
      resolve(stdout);
    });
  });
}
