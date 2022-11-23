console.log('02-weather.js is running!');

/**
 * @link https://www.7timer.info/doc.php?lang=en
 */

// Get the button AND the weather data element.
const $button = $('#get-weather-button');
// console.log($button);

const $weatherDataP = $('#weather-data');
// console.log($weatherDataP);

// Check if the button is clicked.
$button.on('click', () => {
    // console.log('$button was clicked!');

    // Retrieve weather.
    $.ajax({
        url: 'http://www.7timer.info/bin/api.pl?'
              +'lon=113.17'
              +'&'
              +'lat=23.09'
              +'&'
              +'product=astro'
              +'&'
              +'output=json', // json || xml
        success: (response) => {
            // console.log(typeof response, response);

            // We have a string! Not an obj... what do we do?
            const responseObj = JSON.parse(response);
            // console.log('responseObj', responseObj);

            // Show the user the weather data.

            // We need dataseries...
            const dataSeries = responseObj.dataseries;
            // We want temperature and percipitation...
            const firstWeatherData = dataSeries[0]; // Get first weather data.
            console.log('firstWeatherData', firstWeatherData);

            const temp = firstWeatherData.temp2m;
            const prec = firstWeatherData.prec_type;

            // Format in HTML, and show the user.
            $weatherDataP.html(`
                <strong>${temp}&deg;C</strong>
                Percipitation: <em>${prec.charAt(0).toUpperCase()+prec.slice(1)}</em>
            `);
        }
    });
});
