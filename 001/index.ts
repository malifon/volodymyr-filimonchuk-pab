const express = require("express");
const app = express();
app.get("/", function (req, res) {
  const query = req.query;
  console.log(query);

  res.send(query); 
});
app.listen(3000);
