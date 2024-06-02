import Computador from "./computador.js";

const playText = document.getElementById('playText');
const restartBtn = document.getElementById('restartBtn');
const divs = Array.from(document.getElementsByClassName("div"));
const indicadorCor = getComputedStyle(document.body).getPropertyValue("--winning-blocks");
const O_TEXT = "o";
const X_TEXT = "x";
var relogim = document.getElementById('relog')

let jogadorAtual = X_TEXT;
let espacos = Array(9).fill(null);
const xPontos = document.getElementById("x-points");
const oPontos = document.getElementById("o-points");

const levelSelect = document.getElementById('difficulty-select');
let level = 1;

const computador = new Computador();
let gameOver = false;

levelSelect.addEventListener('change', (e) => {
    level = Number(e.target.value);
});

const startGame = () => {
    divs.forEach((div) => div.addEventListener('click', divClicked));
};

function divClicked(e) {
    if (gameOver) return; // Adiciona esta linha para impedir jogadas após o término do jogo

    const id = e.target.id;

    if (!espacos[id]) {
        espacos[id] = jogadorAtual;
        e.target.innerText = jogadorAtual;
        e.target.classList.add(jogadorAtual)

        if (playerGanhou()) {
            playText.innerHTML = `${jogadorAtual} Ganhou`;
            const winningBlocks = playerGanhou();
            winningBlocks.map((div) => (divs[div].style.backgroundColor = indicadorCor));
            pontosVencedor();
            gameOver = true; // Marca o jogo como terminado
        } else if (empatou()) {
            playText.innerHTML = "Empatou";
            gameOver = true; // Marca o jogo como terminado
        }

        jogadorAtual = jogadorAtual === X_TEXT ? O_TEXT : X_TEXT;

        if (jogadorAtual === O_TEXT && !gameOver) {
            setTimeout(() => computador.play(espacos, divs, level), 500);
        }
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
        const [a, b, c] = combo;
        if (espacos[a] && espacos[a] === espacos[b] && espacos[a] === espacos[c]) {
            return combo;
        }
    }
    return false;
}

function empatou() {
    return espacos.every(space => space !== null);
}

function pontosVencedor() {
    if (jogadorAtual === X_TEXT) xPontos.innerText = Number(xPontos.innerText) + 1;
    else oPontos.innerText = Number(oPontos.innerText) + 1;
}



let ultimoVencedor; // Variável para armazenar quem foi o último jogador a vencer

restartBtn.addEventListener("click", restart);

function restart() {
    // Resetar os espaços e o texto das células
    gameOver = false;
    espacos = Array(9).fill(null);

    // Se houve um vencedor na última partida, esse jogador começa agora
    if (ultimoVencedor) {
        jogadorAtual = ultimoVencedor;
        ultimoVencedor = null; // Resetar o último vencedor após o reinício
    } else {
        // Caso contrário, o próximo jogador começa
        jogadorAtual = jogadorAtual === X_TEXT ? O_TEXT : X_TEXT;
    }

    playText.innerHTML = "JOGO DA VELHA";
    divs.forEach((div) => {
        div.innerText = "";
        div.style.backgroundColor = "";
    });

    // Se o jogador atual for O_TEXT (computador), faça o computador jogar
    if (jogadorAtual === O_TEXT) {
        setTimeout(() => computador.play(espacos, divs, level), 500);
    }
}

// No final da função playerGanhou, atualize a variável 'ultimoVencedor' com o jogador atual
if (playerGanhou()) {
    ultimoVencedor = jogadorAtual;
    // Restante do código...
}



startGame();
