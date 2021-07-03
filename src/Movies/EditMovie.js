import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuthContext } from '../Auth/AuthContext';
import { apiUrl } from '../shared/config';
import { useGlobalMessage } from '../shared/GlobalMessage';

export function EditMovie() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { token } = useAuthContext();
  const createMessage = useGlobalMessage();

  useEffect(() => {
    async function fetchMovies() {
      const results = await fetch(apiUrl + '/movies/' + id).then((res) =>
        res.json()
      );

      setMovie(results);
    }
    fetchMovies();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(apiUrl + '/movies/' + id, {
      method: 'PUT',
      headers: {
        'X-Auth-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Title: movie.Title }),
    }).then((res) => res.json());

    createMessage(
      'success',
      'Updated Movie ' + movie.Title,
      'You have successfully updated the movie!'
    );
  }

  if (!movie) {
    return <h2>Loading ...</h2>;
  }
  return (
    <>
      <h1>Edit movie {movie.Title}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="Title"
          id="Title"
          value={movie.Title}
          onChange={(e) => setMovie({ ...movie, Title: e.target.value })}
        />
        <button type="submit">Update Movie</button>
      </form>
    </>
  );
}
