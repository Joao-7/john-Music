// menu principal
function abrirMenuP() {
    var menu = document.querySelector('.box-menu');
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
document.addEventListener('click', function (event) {
    var menu = document.querySelector('.box-menu');
    var button = document.querySelector('.box-icone-m');

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.style.display = "none";
    }
});
// menu principal

// Variáveis para controle do movimento das divs
const separator = document.getElementById('separator');
const boxLeft = document.querySelector('.box-left');

let isResizing = false;

separator.addEventListener('mousedown', (e) => {
    isResizing = true;
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
    });
});

function handleMouseMove(e) {
    if (isResizing) {
        const newWidth = e.clientX - boxLeft.getBoundingClientRect().left;
        if (newWidth > 300 && newWidth < window.innerWidth - 450) { // Limites de largura
            boxLeft.style.width = `${newWidth}px`;
        }
    }
}
// Variáveis para controle do movimento das divs



// redirecionamentos
function scrollToSection() {
    document.getElementById('header').scrollIntoView({ behavior: 'smooth' });
}


// Tema claro
function mudarTema() {
    document.body.classList.toggle('claro'); // Alterna a classe 'claro' no body
    const btn = document.querySelector('.mudar-tema'); // Seleciona o botão pelo seletor
    if (btn) {
        btn.classList.toggle('ativo'); // Alterna uma classe opcional para o botão, se necessário
    }
}
// Tema claro


//menu configurações
function abrirMenuconf() {
    var menu = document.querySelector('.Configurações');
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
function fecharConf() {
    var container = document.querySelector('.Configurações');
    container.style.display = 'none';
}

//menu configurações


//botões carrosseis
const carrosseis = document.querySelectorAll('.carrossel');
const leftButtons = document.querySelectorAll('.move-left-button');
const rightButtons = document.querySelectorAll('.move-right-button');

leftButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        carrosseis[index].scrollLeft -= 400; //mover 400px pixeis para esquerda
    });
});

rightButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        carrosseis[index].scrollLeft += 400; //mover 400px pixeis para direita
    });
});
//botões carrosseis


//pesquisa
document.getElementById("Pesquisar").addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    const items = document.querySelectorAll(".carrossel .box-music");


    items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
            item.style.display = "";
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            item.style.display = "none";
        }
    });
});
//pesquisa


// Selecione os botões de reprodução e o player principal
const playBtns = document.querySelectorAll('.play');
const boxplayer = document.querySelector('.boxplayer');
const content = document.querySelector('.containercont');
const playbox = document.querySelectorAll('.box-musi')
const allAudioElements = document.querySelectorAll('.audio'); // Todos os elementos de áudio 
let currentAudio = null; // Rastrea o áudio atualmente tocando
let currentPlayingBtn = null; // Rastrea o botão atualmente ativo

// Adiciona o evento de clique a todas as .box-music para tocar a música correspondente
playbox.forEach(box => {
    box.addEventListener('click', function () {
        let playButton = this.querySelector('.play'); // Obtém o botão de play dentro do box
        if (playButton) {
            handlePlayButtonClick(playButton); // Aciona a função que já lida com a reprodução
        }
    });
});

// Garante que o boxplayer esteja fechado ao carregar a página
boxplayer.classList.remove('open');
if (content) content.style.marginBottom = '0'; // Remove margem inicial

// Função para alternar entre reproduzir/pausar o áudio
function handlePlayButtonClick(button) {
    const audioId = button.getAttribute('data-audio'); // Obtém o ID do áudio associado
    const audioElement = document.getElementById(audioId); // Seleciona o elemento de áudio correspondente
    const playIcon = button.querySelector('.fa-play'); // Ícone de play
    const pauseIcon = button.querySelector('.fa-pause'); // Ícone de pause

    // Pausa o áudio atual se outro botão foi clicado
    if (currentAudio && currentAudio !== audioElement) {
        currentAudio.pause();
        if (currentPlayingBtn) {
            const prevPlayIcon = currentPlayingBtn.querySelector('.fa-play');
            const prevPauseIcon = currentPlayingBtn.querySelector('.fa-pause');
            prevPlayIcon.style.display = 'inline'; // Mostra o ícone de play
            prevPauseIcon.style.display = 'none'; // Esconde o ícone de pause
        }
    }

    // Alterna entre play e pause no mesmo botão
    if (audioElement.paused) {
        // Esconde todos os outros áudios no player
        allAudioElements.forEach(audio => {
            if (audio !== audioElement) {
                audio.style.display = 'none';
                audio.pause();
            }
        });

        audioElement.style.display = 'block'; // Mostra apenas o áudio atual
        audioElement.play();
        playIcon.style.display = 'none'; // Esconde o ícone de play
        pauseIcon.style.display = 'inline'; // Mostra o ícone de pause
        currentAudio = audioElement; // Atualiza o áudio atual
        currentPlayingBtn = button; // Atualiza o botão atual

        // Mostra o player (se estiver fechado)
        if (!boxplayer.classList.contains('open')) {
            boxplayer.classList.add('open');
            if (content) content.style.marginBottom = '80px'; // Ajusta a margem
            boxplayer.style.display = 'flex'; // Exibe o player centralizado
        }
    } else {
        audioElement.pause();
        playIcon.style.display = 'inline'; // Mostra o ícone de play
        pauseIcon.style.display = 'none'; // Esconde o ícone de pause
    }
}

// Adiciona o evento de clique a todos os botões
playBtns.forEach(button => {
    button.addEventListener('click', () => handlePlayButtonClick(button));
});

// Garante que todos os áudios estejam ocultos inicialmente
allAudioElements.forEach(audio => {
    audio.style.display = 'none';
});

// Função de fechar o player
function closePlayer() {
    // Pausa o áudio atual, se houver
    if (currentAudio) {
        currentAudio.pause();
        currentPlayingBtn.querySelector('.fa-play').style.display = 'inline'; // Exibe o ícone de play
        currentPlayingBtn.querySelector('.fa-pause').style.display = 'none'; // Esconde o ícone de pause
    }

    // Fecha o boxplayer
    boxplayer.style.display = 'none';
    if (content) content.style.marginBottom = '0'; // Restaura a margem

    // Exibe o botão para abrir o player novamente
    const openPlayerBtn = document.querySelector('.openplayer');
    if (openPlayerBtn) {
        openPlayerBtn.style.display = 'flex'; // Mostra o botão para abrir o player
    }
}

// Adiciona o evento de clique ao botão de fechar
const closeButton = document.querySelector('.closeplayer');
if (closeButton) {
    closeButton.addEventListener('click', closePlayer); // Vincula a função de fechar ao botão
}

// Adiciona o evento de clique ao botão para abrir o player
const openPlayerButton = document.querySelector('.openplayer');
if (openPlayerButton) {
    openPlayerButton.addEventListener('click', function() {
        // Abre o boxplayer novamente
        boxplayer.style.display = 'flex';
        boxplayer.classList.add('open');
        if (content) content.style.marginBottom = '80px'; // Ajusta a margem

        // Esconde o botão de abrir o player
        openPlayerButton.style.display = 'none';
        
        // Se houver áudio tocando, continue tocando ao reabrir o player
        if (currentAudio) {
            currentAudio.play();
            currentPlayingBtn.querySelector('.fa-play').style.display = 'none'; // Esconde o ícone de play
            currentPlayingBtn.querySelector('.fa-pause').style.display = 'inline'; // Mostra o ícone de pause
        }
    });
}




