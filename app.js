const ListaDeCartas = [
    {
        nome: 'fries',
        img: 'Imagens/fries.png'
    },
    {
        nome: 'milkshake',
        img: 'Imagens/milkshake.png'
    },
    {
        nome: 'cheeseburger',
        img: 'Imagens/cheeseburger.png'
    },
    {
        nome: 'hotdog',
        img: 'Imagens/hotdog.png'
    },
    {
        nome: 'ice-cream',
        img: 'Imagens/ice-cream.png'
    },
    {
        nome: 'pizza',
        img: 'Imagens/pizza.png'
    },
    {
        nome: 'fries',
        img: 'Imagens/fries.png'
    },
    {
        nome: 'milkshake',
        img: 'Imagens/milkshake.png'
    },
    {
        nome: 'cheeseburger',
        img: 'Imagens/cheeseburger.png'
    },
    {
        nome: 'hotdog',
        img: 'Imagens/hotdog.png'
    },
    {
        nome: 'ice-cream',
        img: 'Imagens/ice-cream.png'
    },
    {
        nome: 'pizza',
        img: 'Imagens/pizza.png'
    }
];
// Sortear cartas aleatórias
ListaDeCartas.sort(() => 0.5 - Math.random());

const mesaDisplay = document.querySelector('#mesa');
const resultadoFinal = document.querySelector('#resultado');
let cartasEscolhidas = [];
let IdCartasEscolhidas = [];
const cartasEncontradas = []

function criandoMesa() {
    for (let i = 0; i < ListaDeCartas.length; i++) {
        const carta = document.createElement('img')
        carta.setAttribute('src', 'Imagens/blank.png');
        carta.setAttribute('data-id', i);


        // Pegando o click para virar carta
        carta.addEventListener('click', virarCarta);
        mesaDisplay.appendChild(carta);
    }
}
criandoMesa();


function compararCartas() {

    const baralho = document.querySelectorAll('img');
    const escolhaUm = IdCartasEscolhidas[0];
    const escolhaDois = IdCartasEscolhidas[1];
    

    if (escolhaUm == escolhaDois) {
        baralho[escolhaUm].setAttribute('src', 'Imagens/blank.png');
        baralho[escolhaDois].setAttribute('src', 'Imagens/blank.png');
        alert('Você selecionou a mesma imagem');
    };

    if (cartasEscolhidas[0] == cartasEscolhidas[1]) {
        alert('Encontrou!');
        baralho[escolhaUm].setAttribute('src', 'Imagens/white.png');
        baralho[escolhaDois].setAttribute('src', 'Imagens/white.png');
        baralho[escolhaUm].removeEventListener('click', virarCarta);
        baralho[escolhaDois].removeEventListener('click', virarCarta);
        cartasEncontradas.push(cartasEscolhidas);
    } else {
        baralho[escolhaUm].setAttribute('src', 'Imagens/blank.png');
        baralho[escolhaDois].setAttribute('src', 'Imagens/blank.png');
    };

    resultadoFinal.textContent = cartasEncontradas.length;
    cartasEscolhidas = [];
    IdCartasEscolhidas = [];

    if (cartasEncontradas.length == ListaDeCartas.length / 2) {
        resultadoFinal.textContent = 'Parabéns! Você encontrou todas as cartas.'
    }

};

function virarCarta() {
    const idCartas = this.getAttribute('data-id');
    cartasEscolhidas.push(ListaDeCartas[idCartas].nome);
    IdCartasEscolhidas.push(idCartas);
    this.setAttribute('src', ListaDeCartas[idCartas].img);
    if (cartasEscolhidas.length === 2) {
        setTimeout(compararCartas, 500);
    }
}