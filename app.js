const grid = document.querySelector('.grid');
const resultadoPartida = document.querySelector('.resultado')
let inicioDoAtirador = 202;
let width = 15; // Porque é o número de blocos dentro de cada linha do mapa
let direcao = 1;
let idMonstros;
let movendoParaDireita = true;
let monstrosRemovidosArray = [];
let resultado = 0


// Criando os blocos  internos que serão os 'px'
for (let i = 0; i < 225; i++) {
    const blocosMapa = document.createElement('div');
    grid.appendChild(blocosMapa);
};

///////////////////////////////////////////-----------------////////////////////////////////

const blocos = Array.from(document.querySelectorAll('.grid div'));

const monstrosInvasores = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

// desenhando monstros no mapa

function imagemMonstros() {
    for (let i = 0; i < monstrosInvasores.length; i++) {
        if (!monstrosRemovidosArray.includes(i)) {
            blocos[monstrosInvasores[i]].classList.add('monstro');
        }
    };
};

imagemMonstros();

function removerMonstro() {
    for (let i = 0; i < monstrosInvasores.length; i++) {
        blocos[monstrosInvasores[i]].classList.remove('monstro');
    };
};  


blocos[inicioDoAtirador].classList.add('atirador');

// Mover o atirador
function moverAtirador(e) {
    blocos[inicioDoAtirador].classList.remove('atirador');
    switch (e.key) {
        case 'ArrowLeft':
            if (inicioDoAtirador % width !== 0) inicioDoAtirador -= 1
            break
        case 'ArrowRight':
            if (inicioDoAtirador % width < width - 1) inicioDoAtirador += 1
            break
    };
    blocos[inicioDoAtirador].classList.add('atirador');
};
document.addEventListener('keydown', moverAtirador);

// Movendo os monstros
function moverMonstros() {
    const limiteEsquerdo = monstrosInvasores[0] % width === 0;
    const limiteDireito = monstrosInvasores[monstrosInvasores.length - 1] % width === width - 1;
    removerMonstro();

    if (limiteDireito && movendoParaDireita) {
        for (let i = 0; i < monstrosInvasores.length; i++) {
            monstrosInvasores[i] += width + 1
            direcao = -1
            movendoParaDireita = false
        };
    } else if (limiteEsquerdo && !movendoParaDireita) {
        for (let i = 0; i < monstrosInvasores.length; i++) {
            monstrosInvasores[i] += width - 1
            direcao = 1
            movendoParaDireita = true
        };
    };


    for (let i = 0; i < monstrosInvasores.length; i++) {
        monstrosInvasores[i] += direcao
    };


    imagemMonstros()

    // Como finalizar o jogo

    if (blocos[inicioDoAtirador].classList.contains('monstro', 'atirador')) {
        resultadoPartida.innerHTML = 'GAME OVER'
        clearInterval(idMonstros)
    };

    for (let i = 0; i < monstrosInvasores.length; i++) {
        if (monstrosInvasores[i] > blocos.length) {
            resultadoPartida.innerHTML = 'GAME OVER';
            clearInterval(idMonstros)
        }
    }

    if(monstrosRemovidosArray.length === monstrosInvasores.length){
        resultadoPartida.innerHTML = 'Você ganhou!!'
        clearInterval( idMonstros)
    }

};

idMonstros = setInterval(moverMonstros, 500);

// Atirador

function tiros(e) {
    let balasId;
    let posicaoDaBalas = inicioDoAtirador;
    function movendoBalas() {
        blocos[posicaoDaBalas].classList.remove('tiro');
        posicaoDaBalas -= width;
        blocos[posicaoDaBalas].classList.add('tiro');

        if (blocos[posicaoDaBalas].classList.contains('monstro')) {
            blocos[posicaoDaBalas].classList.remove('tiro');
            blocos[posicaoDaBalas].classList.remove('monstro');
            blocos[posicaoDaBalas].classList.add('boom');

            setTimeout(() => blocos[posicaoDaBalas].classList.remove('boom'), 300);
            clearInterval(balasId)

            const monstrosRemovidos = monstrosInvasores.indexOf(posicaoDaBalas);
            monstrosRemovidosArray.push(monstrosRemovidos)
            resultado++
            resultadoPartida.innerHTML = resultado
        }

    };
    switch (e.key) {
        case 'ArrowUp':
            balasId = setInterval(movendoBalas, 100);
    };
};

document.addEventListener('keydown', tiros) 