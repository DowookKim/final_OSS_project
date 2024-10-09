const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
    try {
        const response = await axios.get('http://www.aladin.co.kr/ttb/api/ItemList.aspx', {
            params: req.query
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(3001, () => {
    console.log('Proxy server running on port 3001');
});
