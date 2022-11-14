const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='

const API_KEY = '&appid=9d309636ca1425c2488b0af0728f7a2b'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value || 'London'
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			const status = Object.assign({}, ...res.data.weather)
			// res.data.weather[0]

			warning.textContent = ''
			input.value = ''

			if (status.id.toString().charAt(0) == '2') {
				photo.setAttribute('src', './img/thunderstorm.png')
			} else if (status.id.toString().charAt(0) == '3') {
				photo.setAttribute('src', './img/drizzle.png')
			} else if (status.id.toString().charAt(0) == '5') {
				photo.setAttribute('src', './img/rain.png')
			} else if (status.id.toString().charAt(0) == '6') {
				photo.setAttribute('src', './img/ice.png')
			} else if (status.id.toString().charAt(0) == '7') {
				photo.setAttribute('src', './img/fog.png')
			} else if (status.id.toString().charAt(0) == '8' && status.id !== 800) {
				photo.setAttribute('src', './img/cloud.png')
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png')
			}

			weather.textContent = status.main
			cityName.textContent = res.data.name
			temperature.textContent = Math.floor(temp) + '°C'
			humidity.textContent = hum + '%'
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'))
}
const enterGetWeather = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}

input.addEventListener('keyup', enterGetWeather)
button.addEventListener('click', getWeather)
