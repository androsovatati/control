const express = require("express");
const app = express();
const PORT = 5001;

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
});

app.use(express.static(__dirname + '/dist'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
