console.log('01-ghibli.js is running!');

$.ajax({
    url: 'https://ghibliapi.herokuapp.com/films',
    success: (movies) => {
        console.log(movies);

        // Target the body
        const $body = $('body');
        // console.log($body);

        // Create a <UL>
        const $ul = $('<ul></ul>');
        console.log($ul);

        // Create movie <LIs>
        for (const movie of movies) {
            $ul.append(`
                <li>
                    <h2>
                        ${movie.title}
                        (${movie.original_title})
                    </h2>
                    <p>${movie.description}</p>
                    <img src="${movie.movie_banner}">
                </li>
            `);
        }
        
        // Add our populated UL to body.
        $body.append($ul);
    }
});
