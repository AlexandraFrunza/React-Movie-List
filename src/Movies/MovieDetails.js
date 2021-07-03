import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";
import { apiUrl } from "../shared/config";
import { useGlobalMessage } from "../shared/GlobalMessage";
import styles from "./Movies.module.css";
import "font-awesome/css/font-awesome.min.css";

export function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  const createMessage = useGlobalMessage();

  const { token } = useAuthContext();
  useEffect(() => {
    async function fetchMovies() {
      const results = await fetch(apiUrl + "/movies/" + id).then((res) =>
        res.json()
      );

      setMovie(results);
    }
    fetchMovies();
  }, [id]);

  async function handleDelete() {
    // const shouldDelete = window.confirm('Chiar vrei sa stergi filmul?');
    // if (!shouldDelete) {
    //   return;
    // }

    await fetch(apiUrl + "/movies/" + id, {
      method: "DELETE",
      headers: {
        "X-Auth-Token": token,
      },
    }).then((res) => res.text());

    createMessage(
      "success",
      "Movie Deleted",
      `You have successfully deleted ${movie.Title}!`
    );

    history.push("/movies");
  }

  if (!movie) {
    return <h2>Loading ...</h2>;
  }
  return (
    <section className={styles["single-movie"]}>
      <section>
        <img src={movie.Poster} alt={movie.Title} />
        <div className={styles["single-movie-info"]}>
          <h1>{movie.Title}</h1>
          Imdb Rating:
          <span className={styles["star"]}>
            <i className="fa fa-star"></i>
          </span>{" "}
          {movie.imdbRating}
          <p>{movie.Plot}</p>
        </div>
      </section>

      {token && (
        <Link
          type="button"
          className="btn btn-warning"
          to={`/movies/edit/${movie._id}`}
        >
          Edit movie
        </Link>
      )}
      {token && (
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Delete movie
        </button>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Do you really want to delete "{movie.Title}"?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
