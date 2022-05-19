
function msToHMS(ms) {
    // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    return [hours, minutes];
}

window.onload = async () => {

    $.post('/queryingForFlightList', (result) => {

        if (result.status == 'ok') {

            data = result.data[0];

            $(document).ready(function () {

                for (var i = 0; i < data.upcomingFlights.length; i++) {

                    const buttonState = data.upcomingFlights[i].isSeatBooked == 'False' ? null : 'disabled'

                    const [hours, mins] = msToHMS(Math.abs(new Date() - new Date(data.upcomingFlights[i].departureDate).setHours(data.upcomingFlights[i].departureTime)))

                    $('#flightRow').append('<div class= "card" ><div class="card-body"><h5 class = "card-title" >' + data.upcomingFlights[i].departureLocation
                        + ' TO ' + data.upcomingFlights[i].arrivalLocation
                        + '</h5 ><p class="card-text">Flight takes of in ' + hours + ' hours ' + mins + ' minutes </p><a href="/seatBooking" class="btn btn-primary position rounded-pill trip-button ' + buttonState
                        + '">Check in</a></div ></div>');

                }
            }
            )
        }
    });
}