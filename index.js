const express = require('express');

const config = require('./config/config');

const app = express();

require('./config/expressConfig')(app);
require('./config/mongooseConfig')(app);

app.listen(config.PORT, () => console.log(`Server is listening on ${config.PORT}`));


app.get('/', (req, res) => {
    res.send('Любов моя това е началото на новият ти сайт. Обичам те много')
})