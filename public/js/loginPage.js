var loginBtn = document.getElementsByClassName("login")[0];


loginBtn.addEventListener('click', loginUser);

async function loginUser(e) {
  e.preventDefault();

  const username = document.getElementById('emailId').value;
  const pwd = document.getElementById('pwd').value;

  const result =  await fetch('api/login', {
  method: 'POST',
  headers : {
        'Content-Type': 'application/json'
            },
    body :JSON.stringify({username, pwd})
  }).then((res) => res.json())


  if (result.status === 'ok') {
					// everythign went fine
					console.log('Got the token: ', result.data)
					localStorage.setItem('token', result.data)
					alert('Success')
	} else {
					alert(result.error)
				}
    


}