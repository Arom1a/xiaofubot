const player = require("play-sound")();

const path = require("path");
const audiofile = path.join(__dirname, "audio.wav"); // or any path to your .wav file

player.play(audiofile, function (err) {
  if (err) {
    console.error("❌ Error playing sound:", err);
  } else {
    console.log("✅ Audio playback finished.");
  }
});
