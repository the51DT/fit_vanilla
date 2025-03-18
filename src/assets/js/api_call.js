/***************************
 * API Calls *
 ***************************/
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '13b55b2bf5bf4b64df063ddbfe1f3c5c';
const defaultCity = 'Seoul';

async function getWeatherData(city) {
    const url = `${baseUrl}${city}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
