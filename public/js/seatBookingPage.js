const container = document.querySelector('.container-plane');
const seats = document.querySelectorAll('.row-plane .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const bookSeatBtn = document.getElementById('book-seat-button');

var seatSelected;



populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row-plane .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  selectedSeats.length;


  if (selectedSeats.length > 0) {
    document.getElementById('seatText').innerHTML = selectedSeats[0].innerText;

    switch (document.getElementById('seatText').innerHTML) {
      case '1A': alert('1A is near a Exit Row'); break;
      case '1H': alert('1H is near a Exit Row'); break;
      case '3C': alert('3C has more leg space (+ $10)'); break;
      case '3D': alert('3D has more leg space (+ $10)'); break;
      case '3E': alert('3E has more leg space (+ $10)'); break;
      case '3F': alert('3F has more leg space (+ $10)'); break;
      case '6A': alert('6A is near a Exit Row'); break;
      case '6H': alert('6H is near a Exit Row'); break;
    }
  }
  else {
    document.getElementById('seatText').innerHTML = '';

  }

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});





// Initial count and total set
updateSelectedCount();


// function bookSeat() {
//   $.post('/bookingSeat', { seatNumber: document.getElementById('seatText').innerHTML }, (result) => {

//     console.log(document.getElementById('seatText').innerHTML);

//     if (result.status == 'ok') {
//       console.log('ye');
//       console.log(result.data);
//     }
//     else {
//       console.log('nope');
//     }
//   })
// };
