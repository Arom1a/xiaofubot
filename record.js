const record = require("node-record-lpcm16");
const fs = require("fs");
const path = require("path");

// Define output file
const fileName = "audio.wav";
const filePath = path.join(__dirname, fileName);
const fileStream = fs.createWriteStream(filePath, { encoding: "binary" });

console.log("🎙️ Recording... Press Ctrl+C to stop.");

// Start recording
const recordingProcess = record.record({
  sampleRate: 16000,
  threshold: 0,
  verbose: false,
  recordProgram: "sox",
});
recordingProcess.stream().pipe(fileStream);

// Handle Ctrl+C
process.on("SIGINT", () => {
  console.log("\n🛑 Stopping recording...");
  recordingProcess.stop();
  fileStream.close();
  console.log(`💾 Audio saved to: ${filePath}`);
  process.exit();
});
