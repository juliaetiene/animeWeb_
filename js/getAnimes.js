const api_url = 'https://projetoweb-api.vercel.app';
const select = document.getElementById("anime_preference");

select.innerHTML = ""; 

//CODIGO POSSIVELMENTE CORRIGIDO, PS: JULIA

const getAnimes = async () => {
    try {
        const response = await fetch(api_url + "/anime", {
            method: 'GET'
        });

        if (response.ok) {
            let data = await response.json();
            let animes = data.animes || []; 

        
            const invalidItems = ["python", "php", "javascript", "c++", "gg", "anime 1000"];
            animes = animes.filter((anime) => {
                return (
                    anime.title &&
                    typeof anime.title === "string" &&
                    !invalidItems.includes(anime.title.trim().toLowerCase())
                );
            });

            // Adicionar animes válidos ao <select>
            animes.forEach((anime) => {
                const option = document.createElement("option");
                option.value = anime.id;
                option.textContent = anime.title;
                select.appendChild(option);
            });
        } else {
            console.error("Erro ao buscar animes:", response.status);
        }
    } catch (err) {
        console.error("Erro na API:", err);
    }
};

getAnimes();
