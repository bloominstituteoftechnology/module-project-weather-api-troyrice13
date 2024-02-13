async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

// Task 1 ------------------------
  document.querySelector('#weatherWidget').style.display = 'none'

// Task 2-5 ------------------------
document.querySelector('#citySelect').addEventListener('change', (event) => {
  

event.target.disabled = true;
document.querySelector('#weatherWidget').style.display = 'none'
document.querySelector('p.info').textContent = `Fetching weather data...`


let city = event.target.value
let url = `http://localhost:3003/api/weather?city=${city}`

axios.get(url)
    .then(res => {

      document.querySelector('#apparentTemp div:nth-child(2)')
        .textContent = `${res.data.current.apparent_temperature}°`;

      const weatherDescription = res.data.current.weather_description;
      const descriptionEmoji = descriptions.find(d => d[0] === weatherDescription);
      document.querySelector('#todayDescription')
        .textContent = descriptionEmoji ? descriptionEmoji[1] : 'No description available';

      document.querySelector('#todayStats div:nth-child(1)')
        .textContent = `${res.data.current.temperature_min}°/${res.data.current.temperature_max}°`

      document.querySelector('#todayStats div:nth-child(2)')
        .textContent = `Precipitation: ${res.data.current.precipitation_probability * 100}%`

      document.querySelector('#todayStats div:nth-child(3)')
        .textContent = `Humidity: ${res.data.current.humidity}%`

      document.querySelector('#todayStats div:nth-child(4)')
        .textContent = `Wind: ${res.data.current.wind_speed}m/s`

      document.querySelector('p.info').textContent = '';
      event.target.disabled = false;
      document.querySelector('#weatherWidget').style.display = 'block';


      //Forecasts

      res.data.forecast.daily.forEach((day, idx) => {
        let card = document.querySelectorAll('.next-day')[idx]

        let weekDay = card.children[0]
        let apparent = card.children[1]
        let minMax = card.children[2]
        let precipit = card.children[3]

        const date = new Date(day.date);
        date.setDate(date.getDate() + 1);
        const options = { weekday: 'long' };
        const formattedDayOfWeek = date.toLocaleDateString('en-US', options);

        weekDay.textContent = formattedDayOfWeek
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
        precipit.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
      })
      document.querySelector('#location').firstElementChild.textContent = res.data.location.city
    })
    

    .catch(error => {
      console.log(error.message);
      document.querySelector('p.info').textContent = 'Failed to fetch weather data.'
    });
});



  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
