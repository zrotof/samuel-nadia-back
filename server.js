const config = require('./config/dot-env');
const express = require('express');
const cors = require('./cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

app.get("/", (req,res)=>{
    res.send("Le monde chico et tout ce qu'il ya dedans")
}) 

app.use("/v1", cors.corsWithOptions, require('./routes/routes'))

app.listen(config.port, ()=> {
    console.log(`Listening on port ${config.port}`)
});
