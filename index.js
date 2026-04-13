// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

async function fetchWeatherAlerts(stateAbbr) {
  const input = document.getElementById('state-input')
  const alertsDisplay = document.getElementById('alerts-display')
  const errorDiv = document.getElementById('error-message')

  try {
    // Fetch alerts from the National Weather Service API
    const response = await fetch(`${weatherApi}${stateAbbr}`)
    const data = await response.json()

    // Clear error message on successful fetch
    errorDiv.textContent = ''
    errorDiv.classList.add('hidden')

    // Clear previous alerts
    alertsDisplay.innerHTML = ''

    // Display the title and count of alerts
    const alertCount = data.features.length
    const summary = document.createElement('div')
    summary.textContent = `Weather Alerts: ${alertCount}`
    alertsDisplay.appendChild(summary)

    // Display each alert headline
    data.features.forEach(feature => {
      const headline = document.createElement('div')
      headline.textContent = feature.properties.headline
      alertsDisplay.appendChild(headline)
    })

    // Clear the input field
    input.value = ''
  } catch (error) {
    // Handle errors
    errorDiv.textContent = error.message
    errorDiv.classList.remove('hidden')
    alertsDisplay.innerHTML = ''
  }
}

// Set up event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('fetch-alerts')
  button.addEventListener('click', () => {
    const input = document.getElementById('state-input')
    const stateAbbr = input.value.trim()
    if (stateAbbr) {
      fetchWeatherAlerts(stateAbbr)
    }
  })
})