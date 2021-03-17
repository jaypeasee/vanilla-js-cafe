const allReservations = document.querySelector('.all-reservations')

let reservations = []

window.addEventListener('load', pullReservations)


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