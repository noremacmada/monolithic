const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./routes/api');
const port = 3000;
const app = express();

let pathDistFolder = path.normalize(path.join(__dirname, "../dist"));
app.use(express.static(pathDistFolder));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api", api);
app.get("*", (req, res) => {
  res.sendFile(path.join(pathDistFolder, "index.html"));
})


app.listen(port, function(){
  console.log("Server running on localhost:" + port);
});
