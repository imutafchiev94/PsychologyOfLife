const express = require('express');

const config = require('./config/config');
const router = require('./router');


const app = express();

require('./config/mongooseConfig')(app);
require('./config/expressConfig')(app);


app.use(router);

app.listen(config.PORT, () => console.log(`Server is listening on ${config.PORT}`));


