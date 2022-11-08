import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <div>
            <h2>
              <Link to={`/`}>Home</Link>
            </h2>
          </div>
          <div key={movie.id}>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <h2>{movie.title}</h2>
            <span>{movie.year} </span>
            <span>{movie.runtime}분</span>
            <p>{movie.description_full}</p>
            <div>
              <h4>Genres</h4>
              <ul>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
