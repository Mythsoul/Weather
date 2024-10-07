import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import axios from 'axios';

const app = express();  
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/weather', async (req, res) => {   
    const city = req.query.Search;
    const apiKey = process.env.API_KEY;
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {   
        const response = await axios.get(url);
        const data = response.data;
      res.json(data); 
 }
        catch(e){ 
            console.log(e);
        }
    });

    app.listen(3000, () => {
        console.log('Server started on port 3000');
    })
