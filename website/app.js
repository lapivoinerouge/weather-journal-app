/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'c350e001f2ba2c2dfda4e0abef8cc9dc';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getApiData(baseURL, zip, apiKey);
};

// get data from weather API
const getApiData = async(url, zip, key)=> {
    const res = await fetch(url + zip + '&appid=' + key);
    try {
        const data = await res.json();
        //console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
};

// post weather
const postWeather = async(url = '', data = {})=> {
    console.log(data);
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
        //console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}