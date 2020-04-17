/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'c350e001f2ba2c2dfda4e0abef8cc9dc';

// event listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zip = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    getApiData(baseURL, zip, userResponse, apiKey)
        .then(function(data) {
            postWeather('/add', {temperature: data.temperature, date: data.date, userResponse: data.userResponse})
        })
        .then(function(data) {
            getWeather('/all')
        });
};

// get data from weather API
const getApiData = async(url, zip, response, key)=> {
    const res = await fetch(url+zip+'&appid='+key);
    const d = new Date();
    const date = d.getMonth()+"-"+d.getDay()+"-"+d.getFullYear();

    try {
        const weather = await res.json();
        const data = {
            temperature: weather.main.temp,
            date: date,
            userResponse: response
        }
        return data;
    } catch(error) {
        console.log("error", error);
    }
};

// post weather
const postWeather = async(url = '', data = {})=> {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
};

//get weather
const getWeather = async(url = '')=> {
    const res = await fetch(url);
    try {
        const resJson = await res.json();
        document.getElementById('temp').innerHTML = resJson[resJson.length-1].temperature;
        document.getElementById('date').innerHTML = resJson[resJson.length-1].date;
        document.getElementById('content').innerHTML = resJson[resJson.length-1].userResponse;
    } catch(error) {
        console.log('error', error);
    }
};