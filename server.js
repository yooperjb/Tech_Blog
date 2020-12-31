const express = require('express');
//const routes = require();
const sequelize = require('./config/connection');
const path = require('path');


// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// give access to public folder
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
// force: false stops from dropping tables each time
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});