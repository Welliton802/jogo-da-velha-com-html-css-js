// index.js
const playText = document.getElementById('playText');
const restartBtn = document.getElementById('restartBtn');
const divs = Array.from(document.getElementsByClassName("div"));
const indicadorCor = getComputedStyle(document.body).getPropertyValue("--winning-blocks");
const O_TEXT = "o";
const X_TEXT = "x";
let jogadorAtual = X_TEXT;
let espacos = Array(9).fill(null); //criando um array com 9 posições que serão preenchidas
const xPontos = document.getElementById("x-points");
const oPontos = document.getElementById("o-points");

const startGame = () => {
    divs.forEach((div) => div.addEventListener('click', divClicked));
};

function divClicked(e) {
    const id = e.target.id;

    if (!espacos[id]) { //checando se o espaço está vazio
        espacos[id] = jogadorAtual; // colocando o jogador que vai jogar
        e.target.innerText = jogadorAtual;
        e.target.classList.add(jogadorAtual); // Adiciona a classe correspondente (x ou o) trocando de cor 

        if (playerGanhou()) {
            playText.innerHTML = `${jogadorAtual} Ganhou`;
            const winningBlocks = playerGanhou();
            winningBlocks.map(
                (div) => (divs[div].style.backgroundColor = indicadorCor)
            );
            pontosVencedor();
        } else if (empatou()) {
            playText.innerHTML = "Empatou";
        }

        jogadorAtual = jogadorAtual === X_TEXT ? O_TEXT : X_TEXT;
    }
}

const comboVencedores = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function playerGanhou() {
    for (const combo of comboVencedores) {
        const [a, b, c] = combo; // aqui vai a lógica que pegaria o array com as combinações ganhadoras

        if (espacos[a] && espacos[a] === espacos[b] && espacos[a] === espacos[c]) {
            return combo;
        }
    }
    return false;
}

function empatou() {
    for (let i = 0; i < espacos.length; i++) {
        if (espacos[i] === null) return false;
    }
    return true;
}

function pontosVencedor() {
    if (jogadorAtual === X_TEXT) {
        xPontos.innerText = Number(xPontos.innerText) + 1;
    } else {
        oPontos.innerText = Number(oPontos.innerText) + 1;
    }
}

restartBtn.addEventListener("click", restart);

function restart() {
    // Resetar os espaços e o texto das células
    espacos = Array(9).fill(null);
    divs.forEach((div) => {
        div.innerText = "";
        div.style.backgroundColor = "";
        div.classList.remove('x', 'o'); // Remover as classes x e o
    });
    // Voltar o texto de jogar para o estado inicial
    playText.innerHTML = "JOGO DA VELHA";
    jogadorAtual = X_TEXT;
}

function relog() {
    location.reload();
}

startGame();
