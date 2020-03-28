console.log('Client side Javascript file is loaded');

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
    
})


//Fetching data from our Local End Point


const weatherForm = document.querySelector('form');
const search =  document.querySelector('input');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
    response.json().then((data)=> {
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})
    
   // console.log('Testing')
})