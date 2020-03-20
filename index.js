const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const FakeDb = require('./fake-db');
const path = require('path');
const keys = require("./config/keys");

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/booking');


mongoose
  .connect(keys.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log("Connected to DB"))
  .catch(error => console.log("DB Connection error", error));

// mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    
//     // Alex change 
//     // if(process.env.NODE_ENV !== 'production'){
//     //     const fakeDb = new FakeDb();
//     //     //fakeDb.seedDb();
//     }  
// });

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// Alex Change
// if (process.env.NODE_ENV === 'production') {
//     const appPath = path.join(__dirname, '..', 'build');

//     app.use(express.static(appPath));

//     app.get('*', function (req, res) {
//         res.sendFile(path.resolve(appPath, 'index.html'));
//     });
// }



const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('Server started at port:' + PORT);
});