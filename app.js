const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const port = 80

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    //connecting code
    await mongoose.connect('mongodb://127.0.0.1:27017/Gym_contact_details');
    console.log("we are connected to database successfully!");
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  //creation of schema

    const contactSchema = new mongoose.Schema({
      name: String,
      email: String,
      phn: String,
      address: String
    });

    //Creation of collection of created schema
  var contactDetails = mongoose.model('contactDetail', contactSchema);

// app.use(express.static('static',options))


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new contactDetails(req.body);
    myData.save().then(()=>{
        res.send("Item has been successfully saved in mongobd")
    }).catch(()=>{
        res.status(400).send("Item was not send!");
    })
    // res.status(200).render('contact.pug', params);

})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
}