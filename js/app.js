console.log('app.js is loaded!');

console.log('Is jQuery defined? jQuery =', jQuery);

// 1. We have an HTML button.
// 2. When the button is clicked, our browser will ask a server for a list of movies.
//     * List comes from: https://ghibliapi.vercel.app/films
// 3. If we receive a list of movies, we will print them in a list in the page.

const $button = $('#load-movies-button');
console.log('$button', $button);

$button.on('click', function(event) {
    console.log('$button was clicked!');

    // Prevent extra clicks on the button.
    $button.attr('disabled', true); // Disable (don't allow more clicks for now.)

    // Set the text to loading to tell the user we're loading the movies.
    $button.text('Loading...');

    // Run an Ajax request (asking the Ghibli API for a list of movies.)
    $.ajax('//ghibliapi.vercel.app/films', {
        success: function(result) {
            console.log('Ghibli API Ajax success result:', result); // result is an Array in this case! Always check!
            
            // Create a <ul> element in memory, storing it in a variable for now.
            const $UL = $('<ul></ul>');

            // `result` is an array... which means we can loop through it!
            for(const ghibliMovie of result) {
                // Add each list item <li> to our <ul> element.
                $UL.append(`
                    <li>
                        <h2>${ghibliMovie.title} (${ghibliMovie.original_title})</h2>
                        <p>${ghibliMovie.description}</p>
                        <img src="${ghibliMovie.movie_banner}" width="380">
                    </li>
                `);
            }

            // Let's grab the <body> element of our page.
            const $body = $('body');
            $body.append($UL); // Add our full list to the <ul> element.

            // Get rid of the button.
            $button.remove();
        },
        error: function(error) {
            console.log('Ghibli API Ajax error encountered:', error);
            $button.text('An error occurred, please try again later.');
        }
    });
});
