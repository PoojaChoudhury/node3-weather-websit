const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
//Configuring The Port Number For Heroku
const port = process.env.PORT || 3000;

const geocode  = require('./utils/geocode');
const forecast = require('./utils/forecast');


//Configuring Paths for express 
 const publicPath = path.join(__dirname,'../public');
 const viewsPath = path.join(__dirname, '../templates/views');
 const partialsPath = path.join(__dirname,'../templates/partials');



  //Setting up handlers and views location
  app.set('view engine','hbs');
  app.set('views',viewsPath);
  hbs.registerPartials(partialsPath);


  app.get('', (req,res) => {
    res.render('index' , {
        title: 'Weather App',
        name : 'Andrew Mead',
        headerText:'Weather App'
    });
});

app.get('/help', (req,res) => {
    res.render('help' , {
        title: 'Help',
        name : 'This page will help you',
        headerText:'Help Page Header'
    });
});
  app.use(express.static(publicPath));

// Configuring routes through express
app.get('', (req,res) => {
    res.send('Hello Express!');
})

//Creating End Points
app.get('/weather' , (req,res) => {
    /* res.send(req.query);
    console.log(req.query); */
    console.log(req.query);
    if( !req.query.address){
        return res.send({ error:"Atleast give an address"});
        //return ;
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error});
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



//app.com/help
app.get('/help', (req,res) => {
    //console.log("Sasu");
    res.send('Help page');
})

app.get('/about', (req,res) => {
   // console.log("Sasu");
    res.send('<h1>About</h1>');
})
app.get('/weather', (req,res) => {
    // console.log("Sasu");
     res.send({ forecast : "Forecast ",location : "Philadelphia"});
 })


 app.get('*', (req,res) => {
    res.render('error' , {
        title: 'Error',
        name : 'This page cannot be found',
        headerText:'Error'
    });
});
//Startimg the server
app.listen(port, () => {
    console.log("Server is running on port "+ port);
    //res.send("Hello Saswati")
})

