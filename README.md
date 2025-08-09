# Pokémon Chess

A full-stack **Pokémon Chess** game with a **Python Flask** backend and a **frontend** built using **HTML**, **CSS**, and **JavaScript**. The game allows players to interact with a Pokémon-themed chessboard, select and move pieces, and simulate Pokémon battles on a canvas.

## Features
- **Interactive Chessboard**: A canvas-based chessboard where pieces are Pokémon.
- **Pokémon Pieces**: Use popular Pokémon like Charmander and Squirtle as chess pieces.
- **Piece Movement**: Select and move pieces just like a chess game.
- **Python Flask Backend**: The backend is powered by Flask to serve the game and manage static files.
- **Frontend**: Built with HTML, CSS, and JavaScript, displaying Pokémon images and handling user interaction.
- **Backend Setup**: Python backend serves the frontend and can be extended with additional features (e.g., Pokémon battle mechanics).

## Project Structure
pokemon-chess/
│
├── backend/
│ ├── app.py # Flask backend server
│
├── public/
│ ├── index.html # Frontend HTML
│ ├── styles.css # Frontend CSS
│ └── script.js # Frontend JavaScript
│
└── requirements.txt # Python dependencies


## How to Run Locally

### 1. Clone the repository:
Clone the repository to your local machine by running:

```bash
git clone https://github.com/yourusername/pokemon-chess.git
### 2. Navigate to the project directory:
Change into the project directory:

bash
Copy
cd pokemon-chess

### 3. Set up Python virtual environment (optional but recommended):
Create and activate a virtual environment:

bash
Copy
python3 -m venv venv        # Create the virtual environment
source venv/bin/activate    # Activate on Mac/Linux
# On Windows: venv\Scripts\activate
### 4. Install Python dependencies:
Install the required Python libraries using pip:

bash
Copy
pip install -r requirements.txt
### 5. Run the Flask server:
Run the Flask backend server by executing:

bash
Copy
python backend/app.py
### 6. Open the Game in Your Browser:
Once the server is running, open your browser and go to:

cpp
Copy
http://127.0.0.1:5000/
You should see the Pokémon Chess game interface, where you can interact with the chessboard and move Pokémon pieces.

