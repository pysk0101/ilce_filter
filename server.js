

const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const ilceler = require("./ilceler.json");


app.get('/', (req, res) => {
    res.render('index', { ilceler }); 
});
//filter kısmına string yazınca boşluk atıyor onu düzelticeğim.

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


app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
