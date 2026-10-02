import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire("E:/WEB & BLOCKCHAIN PORTFOLIO/projects/nexacart/server/");
const mongoose = require("mongoose");
const raw = fs.readFileSync("E:/WEB & BLOCKCHAIN PORTFOLIO/.env.master", "utf8").replace(/^\uFEFF/, "");
const uri = raw.split(/\r?\n/).find((l) => l.startsWith("MONGODB_URI=")).slice(12).trim();
const mode = process.argv[2];
await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
const orders = mongoose.connection.db.collection("orders");
if (mode === "show") {
  const rows = await orders.find({ seeded: { $ne: true } }).sort({ createdAt: -1 }).limit(5).project({ status: 1, paidVia: 1, total: 1, createdAt: 1 }).toArray();
  console.log(JSON.stringify(rows.map((r) => ({ status: r.status, paidVia: r.paidVia, total: r.total, at: r.createdAt })), null, 0));
} else if (mode === "clean") {
  const r = await orders.deleteMany({ seeded: { $ne: true } });
  console.log("deleted real (test) orders:", r.deletedCount);
}
await mongoose.disconnect();
process.exit(0);
