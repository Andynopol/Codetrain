const express = require('express');

const app = express();

app.listen(8000, ()=>console.log('I am listening'));

app.use(express.static('../UI'));
app.use(express.json({limit:'1mb'}));

app.post('/api', (req, res)=>{
    console.log(req.body);
    res.json({
        status: "Succes",
        lat: req.body.lat,
        lon: req.body.lon,
    });
});