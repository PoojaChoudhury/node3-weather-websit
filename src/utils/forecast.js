const request = require('request');
const forecast = (latitude,longitude,callback) => {
     /* Removing the coordinates to pass it from the function */
    const url = 'https://api.darksky.net/forecast/bf54727fe0f87c93938cedb7178f3fb1/'+ latitude + ','+ longitude;

    request( {url ,json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to the weather service' , undefined);
           
        }else if (body.error){
            callback('Unable to find location' , undefined);
        }else{
            callback(undefined,body.daily.data[0].summary + 'It is currently' +' '+ body.currently.temperature + '. '+ 'There is a '+ body.currently.precipProbability  +'% chance of rain.' )

        }
    });

}

module.exports = forecast;