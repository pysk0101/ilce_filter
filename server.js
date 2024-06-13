// app.js

const express = require('express');
const path = require('path');
const app = express();

// EJS view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sample data (assuming ilceler array)
const ilceler = require("./ilceler.json");

// Route for the home page
app.get('/', (req, res) => {
    res.render('index', { ilceler }); // Render 'index.ejs' and pass ilceler data
});
// { "id": "1", "sehir_id": "37", "ilce_adi": "Abana" 
// Route for search
app.get('/search', (req, res) => {
    const plaka = req.query.plaka; // Get search query parameter
    
    const filteredIlceler = ilceler.filter(ilce =>
        ilce.sehir_id === plaka
    );
   
    res.json(filteredIlceler);
});

// Static files middleware (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
