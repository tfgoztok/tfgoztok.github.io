const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.get(['/', '/home'], (req, res) => {
    res.send('Welcome to my website');
});

app.get('/image', (req, res) => {
    const imagePath = path.join(__dirname, 'assets', 'image.jpg');
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
});

app.get('/pdf', (req, res) => {
    const pdfPath = path.join(__dirname, 'assets', 'document.pdf');
    res.sendFile(pdfPath, (err) => {
        if (err) {
            res.status(404).send('PDF not found');
        }
    });
});

app.get('/about', (req, res) => {
    const textPath = path.join(__dirname, 'assets', 'about.txt');
    res.sendFile(textPath, (err) => {
        if (err) {
            res.status(404).send('Text file not found');
        }
    });
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 