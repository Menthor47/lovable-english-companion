import { execSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const bunLockFiles = ["bun.lockb", "bun.lock"];

function getTimestamp() {
  return new Date().toISOString().replace(/[.:]/g, "-");
}

function getBackupPath(originalPath) {
  const base = `${originalPath}.bak`;
  if (!existsSync(base)) return base;
  return `${base}.${getTimestamp()}`;
}

function restoreIfOnlyBackupExists(originalPath) {
  const backupPath = `${originalPath}.bak`;
  if (existsSync(originalPath)) return;
  if (!existsSync(backupPath)) return;

  renameSync(backupPath, originalPath);
}

const moved = [];

let commandError;

try {
  for (const fileName of bunLockFiles) {
    restoreIfOnlyBackupExists(path.join(rootDir, fileName));
  }

  for (const fileName of bunLockFiles) {
    const originalPath = path.join(rootDir, fileName);
    if (!existsSync(originalPath)) continue;

    const backupPath = getBackupPath(originalPath);
    renameSync(originalPath, backupPath);
    moved.push({ originalPath, backupPath });
  }

  execSync("npx update-browserslist-db@latest", { stdio: "inherit" });
} catch (error) {
  commandError = error;
} finally {
  for (const { originalPath, backupPath } of moved.reverse()) {
    if (!existsSync(backupPath)) continue;
    renameSync(backupPath, originalPath);
  }
}

if (commandError) throw commandError;
