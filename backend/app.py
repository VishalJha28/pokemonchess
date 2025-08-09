from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='../public')

# Route for serving the front-end
@app.route('/')
def index():
    return send_from_directory(os.path.join(app.static_folder), 'index.html')

# Route to serve static files (like CSS and JS)
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(os.path.join(app.static_folder), path)

if __name__ == "__main__":
    app.run(debug=True)
