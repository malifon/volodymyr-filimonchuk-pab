const express = require("express");
const app = express();
// wyślij do przeglądarki wynik z opisem działania, np. 2 + 2 = 4
app.get("/", function (req, response) {
  let { operation, num1, num2 } = req.query;
  let res;
  num1 = +num1;
  num2 = +num2;
  switch (operation) {
    case "dodaj":
      res = num1 + num2;
      break;
    case "usun":
      res = num1 - num2;
      break;
    case "pomnoz":
      res = num1 * num2;
      break;
    case "podziel":
      res = num1 / num2;
      break;

    default:
      res = "This type not exist!";
      break;
  }

  response.send(res.toString());
});
// pobaw się projektem. Co trzeba zrobić zeby zadzialaly adresy np. localhost:3000/add/4/5 ?
app.get("/add/*", function (req, response) {
  response.send(req.params[0]);
});

app.listen(3000);
