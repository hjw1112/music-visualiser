# Music Visualization

A web-based project that allows users to visualize audio in real-time. Users can select different themes, input methods, and demo sounds to experience dynamic and visually appealing sound visualizations.

## Features

- **Themes**: Choose from four themes (Retro, Cyberpunk, Lo-fi, and Classical) to customize the visualizer's appearance.
- **Audio Input**: Select audio from:
  - A preloaded library of demo sounds.
  - Microphone input for live sound visualization.
  - Uploaded audio files.
- **Real-Time Visualization**: Visualize audio in a dynamic canvas based on the frequency and volume of the sound.

## Technologies Used

- **HTML**: Structure and layout of the website.
- **CSS**: Styling for the webpage, including themes and layout.
- **JavaScript**: Core logic for audio processing and visualization using the Web Audio API and Canvas API.

## Getting Started

### Prerequisites

Ensure you have the following:
- A modern web browser that supports the Web Audio API (e.g., Chrome, Firefox, Edge).
- A local development server (e.g., Live Server in VS Code) for best performance.

### Installation

1. Clone the repository or download the source code.
2. Place the project files in a directory.
3. Ensure the following structure:

   ```
   /project-directory
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── sounds/
       ├── sound1.mp3
       ├── sound2.mp3
       ├── sound3.mp3
   ```

4. Open the `index.html` file in your browser or launch it using a local development server.

### Usage

1. **Choose a Theme**:
   - Use the dropdown menu to select a visualizer theme (Retro, Cyberpunk, Lo-fi, or Classical).

2. **Choose an Input Method**:
   - Click **Choose from Library** to view and select preloaded demo sounds.
   - Click **Use Microphone** to visualize audio from your microphone.
   - Click **Upload Audio File** to select and visualize a local audio file.

3. **View the Visualization**:
   - Watch the dynamic visualization of the audio on the canvas.

## File Structure

- `index.html`: The main HTML file containing the structure of the webpage.
- `styles.css`: Handles the styling of the webpage, including themes and layout.
- `script.js`: Contains the JavaScript logic for audio visualization and interactions.
- `sounds/`: A folder containing the preloaded demo sound files.

## Customization

1. **Adding New Sounds**:
   - Place new `.mp3` files in the `sounds/` directory.
   - Update the `<ul>` in the `#demo-sounds` section of `index.html` to include buttons for the new sounds.

2. **Themes**:
   - Modify the `themes` object in `script.js` to add or update themes.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by the power of music and visual art.
- Built with Web Audio API and Canvas API for real-time audio visualization.

---

Enjoy creating mesmerizing audio visualizations!

