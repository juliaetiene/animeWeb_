document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = document.getElementById('register');
    const password = document.getElementById('password').value;
    const anime = Array.from(
        document.getElementById("anime_preference").selectedOptions
    ).map(option => option.value);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
        alert('A senha deve conter pelo menos 8 caracteres, incluindo letras e números.');
        return;
    }

    const formData = new FormData(form);

    formData.delete("anime_preference");
    formData.append("anime_preference", anime);

    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    const register = (async () => {
        const response = await fetch('https://projetoweb-api.vercel.app/auth/register', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObject)
        })
  
        if(response.ok) {
            alert('Cadastro realizado com sucesso!');
  
            location.href = 'login.html';
        }else {
            alert('Cadastro não realizado!');
        }
    })
  
    register()
    document.querySelector('form').reset();
});
