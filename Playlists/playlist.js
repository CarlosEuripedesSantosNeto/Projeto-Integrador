document.addEventListener("DOMContentLoaded", function() {
  const playlists = document.querySelectorAll(".playlist");
  const audioPlayer = document.getElementById("audioPlayer");
  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");
  const progressContainer = document.querySelector(".progress-container");
  const currentSongInfo = document.getElementById("currentSongInfo");
  const currentSongImg = document.getElementById("currentSongImg");

  let currentPlaylistIndex = 0;
  let currentSongIndex = 0;

  function loadSong() {
    const playlist = playlists[currentPlaylistIndex];
    const songs = playlist.querySelectorAll("li");
    const song = songs[currentSongIndex];
    const audioSource = song.getAttribute("data-src");
    const songImg = song.getAttribute("data-img");
    const songTitle = song.textContent;

    audioPlayer.src = audioSource;
    audioPlayer.load();

    currentSongInfo.textContent = songTitle;
    currentSongImg.src = songImg;
  }

  function playSong() {
    audioPlayer.play();
    playBtn.innerHTML = "&#10074;&#10074;"; // Pause icon
  }

  function pauseSong() {
    audioPlayer.pause();
    playBtn.innerHTML = "&#9658;"; // Play icon
  }

  function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentPlaylistIndex--;
      if (currentPlaylistIndex < 0) {
        currentPlaylistIndex = playlists.length - 1;
      }
      const playlist = playlists[currentPlaylistIndex];
      const songs = playlist.querySelectorAll("li");
      currentSongIndex = songs.length - 1;
    }
    loadSong();
    playSong();
  }

  function nextSong() {
    const playlist = playlists[currentPlaylistIndex];
    const songs = playlist.querySelectorAll("li");
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
      currentPlaylistIndex++;
      if (currentPlaylistIndex >= playlists.length) {
        currentPlaylistIndex = 0;
      }
    }
    loadSong();
    playSong();
  }

  function updateProgressBar() {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / width) * duration;
  }

  // Load the first song of the first playlist when the page is loaded
  loadSong();

  // Event listeners for control buttons
  playBtn.addEventListener("click", function() {
    if (audioPlayer.paused) {
      playSong();
    } else {
      pauseSong();
    }
  });

  prevBtn.addEventListener("click", prevSong);

  nextBtn.addEventListener("click", nextSong);

  // Update progress bar during song playback
  audioPlayer.addEventListener("timeupdate", updateProgressBar);

  // Go to the next song when the current song ends
  audioPlayer.addEventListener("ended", nextSong);

  // Event listeners for clicking on songs in the playlist
  playlists.forEach((playlist, playlistIndex) => {
    const songs = playlist.querySelectorAll("li");
    songs.forEach((song, songIndex) => {
      song.addEventListener("click", () => {
        currentPlaylistIndex = playlistIndex;
        currentSongIndex = songIndex;
        loadSong();
        playSong();
      });
    });
  });

  // Event listener for clicking on the progress bar
  progressContainer.addEventListener("click", setProgress);
});
