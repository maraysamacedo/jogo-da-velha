//Dados iniciais
let square = {   //colchete significa objeto
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let player = 'x';     //de quem é a vez
let warning = '';     //mensagem
let playing = false;

reset();


//Eventos
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {   //seleciona todos que possuem a classe "item" no HTML; "forEach" percorre cada item existente no HTML
    item.addEventListener('click', itemClick);   //evento de clique em todos que possui a classe item
})



//Funções
function itemClick(event) {
    let item = event.target.getAttribute('data-item');   //localizando atributo do elemento data-item
    if(playing && square[item] === '') {   //se o jogo está rolando e square item estiver vazio
        square[item] = player;   //será preenchido com o player, ou seja, o jogador da vez
        renderSquare();
        togglePlayer();
    
    }
}


function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);   
    //arrendondar para baixo, ou seja, gerar um numero aleatório entre 0 e 1 e multiplica por 2. Resultado arredondado entre 0 ou 1 

    player = (random === 0) ? 'x' : 'o'; //se player for igual a 0, é o jogador X. Se não for, é o jogador O
    
    for (let i in square) {     //zerando o square(quadro)
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();

}


function renderSquare() {    //renderização
    for( let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);   //selecionar o correspondente do html, ou seja, a div
        if (square[i] !== '') {   //se tem algo preenchido 
            item.innerHTML = square[i];   // deixa como está
        } else {
            item.innerHTML = '';   //caso contrário, deixe vazio
        }
    }

    checkGame();
}



function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning; 

}

function togglePlayer() {
    if (player === 'x') {
        player = 'o';
    } else {
        player = 'x';
    }
    renderInfo();
}

function checkGame() {    //criada para verificar quem ganhou
    if (checkWinnerFor('x')) {    //criada para verificar quem ganhou
        warning = 'O "x" venceu';
        playing = false;   //impossibilita de jogar por ter acabado o jogo
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;   
    } else if (isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player) {
    let pos = [      //possibilidades para ganhar 
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for(let w in pos) {      //verificar se o player esta preenchido com uma possibilidade de ganhar
        let pArray = pos[w].split(',');    //split = gera array (a1,a2,a3)
        let hasWon = pArray.every(option => square[option] === player);   //every = percorre todos os arrays para verificações
         if (hasWon) {
             return true;
         }  
    }

    return false;         //caso passe por todo o "for" e não localize ganhador, retorne falso, ou seja, velha
}


function isFull() {
    for (let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

        return true;
}