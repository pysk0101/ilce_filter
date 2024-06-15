

const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const ilceler = require("./ilceler.json");

app.get('/iletisim', (req, res) => {
    res.render("iletisim");
});

app.post("/iletisim",  (req, res) => {
    res.sendStatus(200);
})


app.get('/search', (req, res) => {
    const plaka = req.query.plaka; 
    
    if (!plaka) {
        return res.json(ilceler);
    }

    const filteredIlceler = ilceler.filter(ilce =>
        ilce.sehir_id === plaka
    );
   
    res.json(filteredIlceler);
});

app.get('/', (req, res) => {
    res.render('index', { ilceler }); 
});


const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
