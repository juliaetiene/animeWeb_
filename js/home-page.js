const defaultImage = "https://via.placeholder.com/120x160?text=Imagem+Não+Disponível";

// Função para carregar a imagem de forma dinâmica
function loadImage(src, imgElement) {
    const img = new Image();
    img.src = src;
    img.onload = function () {
        imgElement.src = this.src;
    };
    img.onerror = function () {
        imgElement.src = defaultImage;
    };
}

// Obter dados do usuário logado
const loggedUser = JSON.parse(localStorage.getItem('user'));

// Verificar se há um usuário logado
if (loggedUser) {
    document.querySelector('h1').textContent = `Seja bem-vindo, ${loggedUser.name}!`;
    document.querySelector('p').textContent = `Seu e-mail é: ${loggedUser.email}`;

    const animeList = document.querySelector('.anime-list');
    animeList.innerHTML = ''; // Limpar a lista inicial

    // Adicionar os animes favoritos selecionados pelo usuário
    loggedUser.animes.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';

        // Criar elemento de imagem
        const imgElement = document.createElement('img');
        loadImage(anime.cover || defaultImage, imgElement);

        // Criar título do anime
        const animeTitle = document.createElement('span');
        animeTitle.textContent = anime.title.charAt(0).toUpperCase() + anime.title.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');

        // Adicionar imagem e título ao card
        animeCard.appendChild(imgElement);
        animeCard.appendChild(animeTitle);

        // Adicionar card à lista de animes
        animeList.appendChild(animeCard);
    });
} else {
    // Redirecionar para a página de login se não houver usuário logado
    location.href = '/pages/login.html';
}
