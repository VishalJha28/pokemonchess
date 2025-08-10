const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const boardSize = 8;
const cellSize = canvas.width / boardSize;

const startScreen = document.getElementById('startScreen');
const battleModal = document.getElementById('battleModal');
const moveButtonsDiv = document.getElementById('moveButtons');

const pieceSets = {
  fire: {k:'charizard', q:'ninetales', r:'arcanine', b:'magmar', n:'rapidash', p:'charmander'},
  water:{k:'blastoise', q:'milotic', r:'gyarados', b:'starmie', n:'lapras', p:'squirtle'},
  grass:{k:'venusaur', q:'lilligant', r:'torterra', b:'roserade', n:'sawsbuck', p:'bulbasaur'}
};
const types = Object.keys(pieceSets);
const images = {};
types.forEach(type=>{
  images[type] = {};
  Object.entries(pieceSets[type]).forEach(([key,name])=>{
    const img = new Image();
    img.src = `https://img.pokemondb.net/artwork/large/${name}.jpg`;
    images[type][key]=img;
  });
});

let playerType = null;
let aiType = null;

const game = new Chess();
let selectedSquare = null;

document.querySelectorAll('.type-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    playerType = btn.dataset.type;
    const others = types.filter(t=>t!==playerType);
    aiType = others[Math.floor(Math.random()*others.length)];
    startScreen.classList.add('hidden');
    drawBoard();
  });
});

canvas.addEventListener('click', e=>{
  if (!playerType || !battleModal.classList.contains('hidden')) return;
  const x = Math.floor(e.offsetX / cellSize);
  const y = Math.floor(e.offsetY / cellSize);
  const file = 'abcdefgh'[x];
  const rank = 8 - y;
  const square = file + rank;
  if (!selectedSquare) {
    const piece = game.get(square);
    if (piece && piece.color === 'w') selectedSquare = square;
  } else {
    const move = game.move({from:selectedSquare, to:square, promotion:'q'});
    selectedSquare = null;
    if (move) {
      if (move.captured) {
        resolveBattle('player', move, ()=>{
          drawBoard();
          if (!game.game_over()) makeAIMove();
        });
      } else {
        drawBoard();
        if (!game.game_over()) makeAIMove();
      }
    } else {
      drawBoard();
    }
  }
});

function drawBoard() {
  for (let row=0; row<boardSize; row++) {
    for (let col=0; col<boardSize; col++) {
      ctx.fillStyle = (row+col)%2===0 ? '#f0f8ff' : '#2f4f4f';
      ctx.fillRect(col*cellSize, row*cellSize, cellSize, cellSize);
    }
  }
  const board = game.board();
  for (let row=0; row<8; row++) {
    for (let col=0; col<8; col++) {
      const piece = board[row][col];
      if (piece) {
        const set = piece.color==='w' ? images[playerType] : images[aiType];
        const img = set[piece.type];
        if (img.complete) {
          ctx.drawImage(img, col*cellSize, row*cellSize, cellSize, cellSize);
        } else {
          img.onload = ()=>ctx.drawImage(img, col*cellSize, row*cellSize, cellSize, cellSize);
        }
      }
    }
  }
}

function makeAIMove() {
  const moves = game.moves({verbose:true});
  if (moves.length === 0) return;
  const move = moves[Math.floor(Math.random()*moves.length)];
  game.move(move);
  if (move.captured) {
    resolveBattle('ai', move, ()=>{ drawBoard(); });
  } else {
    drawBoard();
  }
}

function resolveBattle(attacker, move, callback) {
  battleModal.classList.remove('hidden');
  moveButtonsDiv.innerHTML = '';
  const battleMoves = ['Move 1','Move 2','Move 3','Move 4'];
  battleMoves.forEach(m=>{
    const btn = document.createElement('button');
    btn.textContent = m;
    btn.className = 'battle-move';
    btn.onclick = ()=>{
      battleModal.classList.add('hidden');
      const attackerWins = Math.random() < 0.5;
      if (!attackerWins) {
        game.undo();
        game.remove(move.from);
        const turn = game.turn();
        const fen = game.fen().replace(` ${turn} `, ` ${turn==='w'?'b':'w'} `);
        game.load(fen);
      }
      callback();
    };
    moveButtonsDiv.appendChild(btn);
  });
}

drawBoard();
