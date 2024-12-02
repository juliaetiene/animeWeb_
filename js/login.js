document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Captura os valores do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Elementos para exibir os erros
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const feedback = document.getElementById('feedback');


    // Limpa as mensagens de erro
    emailError.textContent = '';
    passwordError.textContent = '';
    feedback.textContent = '';


    if (!email) {
        emailError.textContent = 'O e-mail é obrigatório.';
        return;
    }

    if (!password) {
      passwordError.textContent = 'A senha é obrigatória.';
      return;
    }

    const login = (async () => {
      const response = await fetch('https://projetoweb-api.vercel.app/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if(response.ok) {
        const userData = await response.json();

        console.log(userData.user)

        localStorage.setItem('user', JSON.stringify(userData.user));

        feedback.textContent = `Bem-vindo de volta, ${userData.user.name}!`;
        feedback.style.color = 'green';

        location.href = 'home-page.html';
      }else {
        feedback.textContent = 'E-mail ou senha incorretos!';
        feedback.style.color = 'red';
      }
    })

    login()
});