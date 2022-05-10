function generateQRCode() {
    var seatNumber =    '5A';
    var flightNumber = '6E4805';

    var flight = flightNumber.concat(seatNumber)
    
    if (seatNumber && flightNumber) {
      let qrcodeContainer = document.getElementById("qrcode");
      qrcodeContainer.innerHTML = "";
      new QRCode(qrcodeContainer, flight);

      /*With some styles*/

      document.getElementById("qrcode-container").style.display = "block";
    } else {
      alert("Please enter a valid URL");
    }
  }