var regBtn = document.getElementsByClassName("reg")[0];


regBtn.addEventListener('click', loginUser);

async function loginUser(e) {
  e.preventDefault();

  const username = document.getElementById('newEmailId').value;
  const pwd = document.getElementById('newPwd').value;

  const result =  await fetch('/api/register', {
  method: 'POST',
  headers : {
        'Content-Type': 'application/json'
            },
    body :JSON.stringify({username, pwd})
  }).then((res) => res.json())

  if (result.status === 'ok') {
    // everythign went fine
    alert('Success')
    await fetch('/homePage')
  } else {
    alert(result.error)
  }
    


}