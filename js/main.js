/* eslint-env es6 */

const showInstructionButton = document.getElementById('showInstructionButton')
const startButton = document.getElementById('startButton')
const playPauseButton = document.getElementById('playPauseButton')
const intro = document.querySelector('.intro')
const instructions = document.querySelector('.instructions')
const timerBg = document.querySelector('.timer-bg')
const timer = document.querySelector('.timer')
const main = document.querySelector('main')
const mainCoords = main.getBoundingClientRect()

let countdown
let seconds = 0
const duration = 120

const audio = new Audio('./sound/rain.mp3')

timerBg.style.setProperty('height', `${mainCoords.height}px`)
timerBg.style.setProperty('width', `${mainCoords.width}px`)

function showInstructions () {
  intro.classList.add('fade-out')
  instructions.style.display = 'block'
  instructions.classList.add('fade-in')
}

function startBreathing () {
  instructions.classList.remove('fade-in')
  instructions.classList.add('fade-out')
  document.querySelector('body').classList.add('bg-animated')

  timerBg.style.setProperty('height', '200px')
  timerBg.style.setProperty('width', '200px')
  timerBg.style.setProperty('left', `50%`)
  timerBg.style.setProperty('top', `50%`)
  timerBg.style.setProperty('margin-left', '-100px')
  timerBg.style.setProperty('margin-top', '-100px')

  timer.style.display = 'block'
  timer.classList.add('fade-in')

  playPauseButton.style.display = 'block'
  playPauseButton.classList.add('fade-in')

  clearInterval(countdown)

  countdown = setInterval(() => {
    
    if (seconds > duration) {
      clearInterval(countdown)
      audio.pause()
      // TODO: tell the user well done
      togglePause() // Or remove and tell the user well done, redirect to another page width the option of restarting
      
      seconds = 0
      return
    }
    
    if (seconds % 3 == 2) { animatePuls() }
    // if (seconds % 2 == 0) { animatePuls() }
    
    animateCountdown(duration)
    seconds++;
  }, 1000)

  audio.play()
}

function animateCountdown (duration) {
  const elem = document.getElementById('seconds')

  // Get the radius ("r" attribute)
  const radius = elem.r.baseVal.value
  // Calculate the circumference of the circle
  const circumference = radius * 2 * Math.PI
  // How long the bar has to be
  const barLength = seconds * circumference / duration

  // Set a dash pattern for the stroke.
  // The dash pattern consists of a dash of the right length,
  // followed by a gap big enough to ensure that we don't see the next dash.
  elem.setAttribute("stroke-dasharray", barLength + " " + circumference)
}

function animatePuls () {
  const circle = document.getElementById('circleGroup')
  const currentWidth = circle.getAttribute("stroke-width")
  circle.setAttribute("stroke-width", currentWidth === '50' ? 72 : 50 )
}

function togglePause () {
  if (playPauseButton.classList.contains('pause')) {
    playPauseButton.classList.add('play')
    playPauseButton.classList.remove('pause')
    pause()
  } else {
    playPauseButton.classList.add('pause')
    playPauseButton.classList.remove('play')
    startBreathing()
  }
}

function pause () {
  const elem = document.querySelector('circle')
  elem.style.animationPlayState = 'paused'
  clearInterval(countdown)
  audio.pause()
}


showInstructionButton.addEventListener('click', showInstructions)
startButton.addEventListener('click', startBreathing)
playPauseButton.addEventListener('click', togglePause)
