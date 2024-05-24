let currentSongTitle = "";

function showPlaylist(playlistId) {
  const playlists = document.querySelectorAll(".playlist");
  playlists.forEach((playlist) => {
    playlist.classList.add("hidden");
    if (playlist.id === playlistId) {
      playlist.classList.remove("hidden");
    }
  });

  const navLinks = document.querySelectorAll(".sidebar .nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("onclick").includes(playlistId)) {
      link.classList.add("active");
    }
  });
}

function playSong(songPath, songTitle) {
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSource = document.getElementById("audioSource");
  const playPauseIcon = document.getElementById("playPauseIcon");
  const currentSong = document.getElementById("currentSong");

  currentSongTitle = songTitle;
  currentSong.textContent = songTitle;

  audioSource.src = songPath;
  audioPlayer.load();
  audioPlayer.play();
  playPauseIcon.classList.remove("fa-play");
  playPauseIcon.classList.add("fa-pause");
}

document.getElementById("playPauseBtn").addEventListener("click", () => {
  const audioPlayer = document.getElementById("audioPlayer");
  const playPauseIcon = document.getElementById("playPauseIcon");

  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  } else {
    audioPlayer.pause();
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  }
});

document.getElementById("audioPlayer").addEventListener("timeupdate", () => {
  const audioPlayer = document.getElementById("audioPlayer");
  const progress = document.getElementById("progress");
  const progressContainer = document.getElementById("progressContainer");

  const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progress.style.width = `${percentage}%`;
});

// Inicializa com a primeira playlist visível
document.addEventListener("DOMContentLoaded", () => {
  showPlaylist("playlist1");
});
