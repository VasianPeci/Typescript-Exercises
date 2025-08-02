interface Movie {
  title: string;
  year: number;
  director: string;
}

function getMovieInfo(movie: Movie): string{
    return `${movie.title} was released in ${movie.year}, directed by ${movie.director}.`;
}

