console.log('app.js is loaded!');

// $ = jQuery
console.log('Is jQuery defined?', jQuery);
console.log('Is $ defined?', $);

$(() => { // Wait until the full HTML document loads before
          // looking for DOM / HTML Elements.

    /**
     * Bubble Example:
     */

    $section = $('section'); // <section> has children!
    // So when we look at the event TARGET element... it will be the precise one
    // that the cursor clicked. NOT necessarily <section> itself.
    $section.on('click', (event) => {
        const elementThatEventIsOccuringOn = event.target;
        console.log('elementThatEventIsOccuringOn:', elementThatEventIsOccuringOn);
        
        if(elementThatEventIsOccuringOn.tagName === 'SECTION') {
            console.log('Clicked the <section>, specifically!');
        }

        elementThatEventIsOccuringOn.style.background = 'red';
    });

    // $bubbleButton = $('#bubble-practice-button');
    // $bubbleButton.on('click', (event) => {
    //     const elementThatEventIsOccuringOn = event.target;

    //     elementThatEventIsOccuringOn.style.background = 'red';
    // });

    /**
     * Ghibli API Example:
     */

    // 1. We want to find the HTML button.
    // const button = document.querySelector('button');
    const $button = $('#movie-button');
    console.log('$button:', $button);

    // 2. Detect when a user clicks the button.
    $button.on('click', (event) => {
        // console.log('event:', event);
        console.log('$button was clicked!');

        // We'll disable the button, so it can't be clicked again.
        $button.attr('disabled', true);

        // 3. Send Ajax request.
        $.ajax({
            url: 'https://ghibliapi.vercel.app/films',
            success: (ghibliMoviesArr) => {
                console.log('$.ajax was successful!');
                console.log('ghibliMoviesArr:', ghibliMoviesArr);

                // Remove the button from the page, so the user doesn't try to click it anymore.
                $button.remove();

                // 4. Create a <UL>
                const $ul = $('<ul></ul>');

                // 5. Append each movie to the list as a <LI>
                for(const movie of ghibliMoviesArr) {
                    const $li = $(`
                        <li>
                            <h2>
                                ${movie.title}
                                (${movie.original_title})
                            </h2>
                            <img src="${movie.movie_banner}" width="300px" />
                            <p><time>${movie.release_date}</time></p>
                            <p>${movie.description}</p>
                        </li>
                    `);
                    $ul.append($li);
                }

                // 6. Append the <UL> to our web page.
                $('body').append($ul);
            },
            error: (error) => {
                console.log('$.ajax experienced an error!');
                console.log('error:', error);
            }
        });
    });

    
});
