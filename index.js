
express = require("express");
bodyParser = require('body-parser');

app = express();
var routes = require('./potusParse'); //importing route
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use('/', routes);
const port = 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
