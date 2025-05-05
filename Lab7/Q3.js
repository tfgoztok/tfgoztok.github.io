// Question 3 is below 
class Exercise3 {
    #movies = new Map();

    add_genre(genre) {
        if (this.#movies.has(genre)) {
            return false;
        }
        this.#movies.set(genre, []);
        return true;
    }

    add_movie_in_genre(genre, new_movie) {
        if (!this.#movies.has(genre)) {
            return false;
        }

        const movies = this.#movies.get(genre);
        if (movies.some(movie => movie.id === new_movie.id)) {
            return false;
        }

        movies.push(new_movie);
        return true;
    }

    update_movie_title_by_genre_and_movie_id(genre, movie_id, new_title) {
        if (!this.#movies.has(genre)) {
            return false;
        }

        const movies = this.#movies.get(genre);
        const movie = movies.find(m => m.id === movie_id);
        
        if (!movie) {
            return false;
        }

        movie.title = new_title;
        return true;
    }

    delete_movie_by_genre_and_movie_id(genre, movie_id) {
        if (!this.#movies.has(genre)) {
            return false;
        }

        const movies = this.#movies.get(genre);
        const initialLength = movies.length;
        
        const filteredMovies = movies.filter(movie => movie.id !== movie_id);
        if (filteredMovies.length === initialLength) {
            return false;
        }

        this.#movies.set(genre, filteredMovies);
        return true;
    }

    get_movie_title_by_id(genre, movie_id) {
        if (!this.#movies.has(genre)) {
            return '';
        }

        const movies = this.#movies.get(genre);
        const movie = movies.find(m => m.id === movie_id);
        
        return movie ? movie.title : '';
    }
}

// Testing time
const movieSystem = new Exercise3();


console.log(movieSystem.add_genre('thriller'));
console.log(movieSystem.add_genre('thriller'));


console.log(movieSystem.add_movie_in_genre('thriller', { id: '1', title: 'The American' })); 
console.log(movieSystem.add_movie_in_genre('thriller', { id: '2', title: 'Arcadian' })); 
console.log(movieSystem.add_movie_in_genre('thriller', { id: '1', title: 'Duplicate' })); 


console.log(movieSystem.update_movie_title_by_genre_and_movie_id('thriller', '1', 'The American (2024)')); 
console.log(movieSystem.get_movie_title_by_id('thriller', '1')); 


console.log(movieSystem.delete_movie_by_genre_and_movie_id('thriller', '2')); 
console.log(movieSystem.get_movie_title_by_id('thriller', '2')); 


console.log(movieSystem.add_movie_in_genre('comedy', { id: '1', title: 'Funny Movie' })); 
console.log(movieSystem.update_movie_title_by_genre_and_movie_id('thriller', '999', 'New Title')); 
console.log(movieSystem.delete_movie_by_genre_and_movie_id('thriller', '999'));