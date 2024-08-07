const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Welcome to my hotel... How i can help you?,we have list of menus')
});

//  Import the router files
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuItemRoutes');
//   use the routers
app.use('/person', personRoutes);
app.use('/menu', MenuItemRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000')
});