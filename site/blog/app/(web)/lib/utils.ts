import { spawnSync } from "node:child_process";
import path from "node:path";

export function getGitLastUpdatedTimeStamp(filePath: string) {
  let lastUpdated;
  try {
    const timestamp = spawnSync(
      "git",
      ["log", "-1", "--format=%at", path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    ).stdout.toString("utf-8");

    lastUpdated = timestamp ? new Date(parseInt(timestamp) * 1000) : new Date();
  } catch {
    /* do not handle for now */
  }
  return lastUpdated;
}
