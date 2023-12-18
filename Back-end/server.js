const app = require('express')();

const dotenv = require('dotenv');


//config

dotenv.config({path:"Back-end/config/config.env"});

app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
});

