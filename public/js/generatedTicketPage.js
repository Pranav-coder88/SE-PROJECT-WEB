function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateQRCode() {




  $.post('/flightInfoQR', (result) => {

    if (result.status == 'ok') {
      data = result.data[0];

      const customerName = capitalizeFirstLetter(data.username);
      const customerSeat = data.upcomingFlights[0].seatNumber;
      const flightNumber = data.upcomingFlights[0].flightNumber;

      const url = 'http://localhost:3000/qrCodeConfirmation?customerName=' + customerName + '&customerSeat=' + customerSeat + '&flightNumber=' + flightNumber




      if (customerSeat && flightNumber) {
        let qrcodeContainer = document.getElementById("qrcode");
        qrcodeContainer.innerHTML = "";
        new QRCode(qrcodeContainer, url);

        /*With some styles*/

        document.getElementById("qrcode-container").style.display = "block";
      } else {
        alert("Please enter a valid URL");
      }

    }
    else {

      console.log(result.status);
      console.log(result.data);
    }
  })


}

