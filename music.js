const audioPlayer = document.getElementById("audio-player");
const playPauseButton = document.getElementById("play-pause");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

let songIndex = 0;
const songs = [
  './music/maou.mp3',
  './music/maou.mp3',
  './music/maou.mp3',
];

function loadSong(index) {
  audioPlayer.src = songs[index];
  audioPlayer.load();
  playPauseButton.textContent = "▶️";
}

function playSong() {
  audioPlayer.play();
  playPauseButton.textContent = "⏸️";
}

function pauseSong() {
  audioPlayer.pause();
  playPauseButton.textContent = "▶️";
}

function togglePlay() {
  if (audioPlayer.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = formatTime(audioPlayer.currentTime);
  const duration = formatTime(audioPlayer.duration);
  currentTimeDisplay.textContent = currentTime;
  durationDisplay.textContent = duration || "00:00";
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load the first song initially
loadSong(songIndex);
