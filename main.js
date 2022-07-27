const D = document

const songList = [
    {
        title: 'Lo-fi Type Beat - Rain',
        file: 'Lo-fi Type Beat - Rain.mp3',
        cover: 'cover1.jpg'
    },
    {
        title: 'Dreaming',
        file: 'Dreaming.mp3',
        cover: 'cover2.jpg'
    },
    {
        title: 'I Need a Girl',
        file: 'I Need a Girl.mp3',
        cover: 'cover3.jpg'
    },
    {
        title: 'Lo-fi 1 hour',
        file: 'Lo-fi 1 hour.mp3',
        cover: 'cover4.jpg'
    }
]

// Capturando Elementos

const songs = D.querySelector('.songs')
const audio = D.getElementById('audio')
const cover = D.getElementById('cover')
const title = D.querySelector('.title')
const playBtn = D.querySelector('#play')
const prevBtn = D.querySelector('#prev')
const nextBtn = D.querySelector('#next')
const progress = D.querySelector('.progress')
const progress__container = D.querySelector('.progress__container')
const songCT = D.querySelector('.currenTime')
const volumen = D.querySelector('.volumen')

// Cancion actual
let actualSong = null
let duracion = 0

// Cargar canciones y Mostrar Listado
function loadSongs () {
    songList.forEach((song, index) => {
        //Crear Li
        const li = document.createElement('li')
        //Crear a
        const link = document.createElement('a')
        link.textContent = song.title
        link.href = '#'
        //Escucha clicks
        link.addEventListener('click', ()=> loadSong(index))
        //Añadir a li
        li.appendChild(link)
        // Añadir li a ul
        songs.appendChild(li)
    })
}

// Escuchar el Audio y Barra de progreso

audio.addEventListener('timeupdate', updateProgress)
progress__container.addEventListener('click', setProgress)
//audio.addEventListener('timeupdate', updateCurrentTime)

//  COntroles Clicks
playBtn.addEventListener('click', () => {
let randomSong = Math.floor(Math.random() * 2)

 if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }

    if (actualSong == null) {
        loadSong(randomSong)
        audio.play()
    }

}) 

//Volumen
volumen.addEventListener('click', function(){
    let vol = (this.value * 0.010)
    audio.volume = vol
})

nextBtn.addEventListener('click', ()=> nextSong())
prevBtn.addEventListener('click', ()=> prevSong())


// Cargar audio Seleccionado
function loadSong(songIndex) {
    if (songIndex != actualSong) {
        audio.src = `./canciones/` + songList[songIndex].file
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        duracion = (audio.duration)
        changeCover(songIndex)
        changeTitle(songIndex)
        playSong()
        updateControls()
        updateCurrentTime()
    }
}

// Actualizar el tiempo de reproduccion
function updateCurrentTime(event) {

    console.log(duracion)

}

// Actualizar barra de progreso
function updateProgress(event) {
    // Total y actual
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100

    progress.style.width = percent + "%"
}

// Hacer la barra clickeable
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    
    audio.currentTime = current
}

// Update Controls
function updateControls() {
    if (audio.paused) {
        playBtn.classList.remove('fa-pause')
        playBtn.classList.add('fa-play')
    } else {
        playBtn.classList.add('fa-pause')
        playBtn.classList.remove('fa-play')
    }
}

// Reproducir cancion
function playSong() {
    if (actualSong != null) {
        audio.play()
        updateControls()    
    }
}

// Pausar Cacnion
function pauseSong() {
    audio.pause()
    updateControls()
}


// Cambiar clase Activa
//function changeActiveClass(actualSong, songIndex)
function changeActiveClass(lasIndex, newIndex) {
    const links = D.querySelectorAll('a')
    if (lasIndex != null) {
        links[lasIndex].classList.remove('activo')
    }
    links[newIndex].classList.add('activo')
}


// Cambiar Cover

function changeCover(songIndex) {
    cover.src = './covers/' + songList[songIndex].cover
}

// Cambiar titulo

function changeTitle(songIndex) {
    title.innerText = songList[songIndex].title
}

// Anterior cancion
function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong -1)
    } else {
        loadSong(songList.length -1)
    }
}

// Siguiente cancion
function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong +1)
    } else {
        loadSong(0)
    }
}

// Loop de canciones
audio.addEventListener('ended', () => nextSong())





// Go
loadSongs()