const allReservations = document.querySelector('.all-reservations')
const reserveBtn = document.querySelector('.reserve-btn')
const nameInput = document.querySelector('.name-input')
const dateInput = document.querySelector('.date-input')
const timeInput = document.querySelector('.time-input')
const numberInput = document.querySelector('.number-input')


let reservations = []

window.addEventListener('load', pullReservations)
reserveBtn.addEventListener('click', makeReservation)

function pullReservations() {
  getReservations()
    .then(data => reservations = data)
    .then(displayReservations)
}

function getReservations() {
  return fetch('http://localhost:3001/api/v1/reservations')
    .then(response => response.json())
}

function displayReservations() {
  allReservations.innerHTML = ""
  const reservationCards = reservations.map(resy => {
    return (
      `<section class="reservation-card" data-id=${resy.id}>
        <h2>${resy.name}</h2>
        <p>${resy.date}</p>
        <p>${resy.time}</p>
        <p>${resy.number}</p>
      </section>`
    )
  })
  allReservations.insertAdjacentHTML('afterbegin', reservationCards)
}

function makeReservation(event) {
  event.preventDefault()
  const reservation = createReservation()
  postReservation(reservation)
    .then(data => reservations.push(data))
    .then(displayReservations)
}

function createReservation() {
  return (
    {
      id: Date.now(),
      name: nameInput.value,
      date: dateInput.value,
      time: timeInput.value,
      number: numberInput.value
    }
  )
}

function postReservation(reservation) {
  return fetch('http://localhost:3001/api/v1/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reservation)
  })
    .then(response => response.json())
}