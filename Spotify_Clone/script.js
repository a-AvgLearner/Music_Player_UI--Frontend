

console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Way Down We Go", filepath: "Songs/1.mp3", coverPath: "Covers/1.jpg"},
    {songName: "Darkside - [NEONI]", filepath: "Songs/2.mp3", coverPath: "Covers/2.jpg"},
    {songName: "GigaChad Theme (Phonk House Version)", filepath: "Songs/3.mp3", coverPath: "Covers/3.jpg"},
    {songName: "INTERWORLD - METAMORPHOSIS [SIGMA EDIT]", filepath: "Songs/4.mp3", coverPath: "Covers/4.jpg"},
    {songName: "HENSONN - SAHARA [Phonk Trollge Extended]", filepath: "Songs/5.mp3", coverPath: "Covers/5.jpg"},
    {songName: "Gangsta's Paradise - Coolio", filepath: "Songs/6.mp3", coverPath: "Covers/6.jpg"},
    {songName: "John Shelby - MONTERO (Peaky Blinders)", filepath: "Songs/7.mp3", coverPath: "Covers/7.jpg"},
    {songName: "Dior - положение _ Polozheniye", filepath: "Songs/8.mp3", coverPath: "Covers/8.jpg"},
    {songName: "Ravens Rock - Polozhenie", filepath: "Songs/9.mp3", coverPath: "Covers/9.jpg"},
    {songName: "The Weeknd - Starboy (Audio) ft. Daft Punk", filepath: "Songs/10.mp3", coverPath: "Covers/10.jpg"},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Handle play-pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updateUIForPlay(songIndex);
    } else {
        audioElement.pause();
        updateUIForPause();
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

const updateUIForPlay = (index) => {
    makeAllPlays();
    document.getElementById(index).classList.remove('fa-play-circle');
    document.getElementById(index).classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}

const updateUIForPause = () => {
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    makeAllPlays();  // Reset all song buttons to play state when paused
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedSongIndex = parseInt(e.target.id);
        if (clickedSongIndex === songIndex) {
            // If the same song is clicked again, toggle play/pause
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                updateUIForPlay(songIndex);
            } else {
                audioElement.pause();
                updateUIForPause();
            }
        } else {
            // Play a new song
            songIndex = clickedSongIndex;
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            updateUIForPlay(songIndex);
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateUIForPlay(songIndex);
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateUIForPlay(songIndex);
})
