// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Chessboard setup
const boardSize = 8;
const cellSize = canvas.width / boardSize;

// Images for Pokémon pieces
const pokemonImages = {
    charmander: new Image(),
    squirtle: new Image()
};

pokemonImages.charmander.src = "https://img.pokemondb.net/artwork/large/charmander.jpg";
pokemonImages.squirtle.src = "https://img.pokemondb.net/artwork/large/squirtle.jpg";

// Array to hold the positions of pieces
let pieces = [
    { type: 'pawn', color: 'white', x: 0, y: 1, image: pokemonImages.charmander },
    { type: 'pawn', color: 'white', x: 1, y: 1, image: pokemonImages.squirtle }
];

// Track the selected piece
let selectedPiece = null;

// Draw the board and pieces on the canvas
function drawBoard() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? '#f0f8ff' : '#2f4f4f'; 
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

            ctx.strokeStyle = '#333';
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }

    pieces.forEach(piece => {
        ctx.drawImage(piece.image, piece.x * cellSize, piece.y * cellSize, cellSize, cellSize);
    });
}

// Handle mouse clicks on the canvas
canvas.addEventListener('click', (e) => {
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);

    const clickedPiece = pieces.find(piece => piece.x === x && piece.y === y);

    if (clickedPiece) {
        if (selectedPiece) {
            selectedPiece.x = x;
            selectedPiece.y = y;
            selectedPiece = null;
        } else {
            selectedPiece = clickedPiece;
        }
    } else if (selectedPiece) {
        selectedPiece.x = x;
        selectedPiece.y = y;
        selectedPiece = null;
    }

    drawBoard();
});

// Initial draw
drawBoard();
