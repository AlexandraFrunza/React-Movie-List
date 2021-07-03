import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';
import styles from './Movies.module.css';

export function Movie({ data }) {
  const card = useRef();

  useEffect(() => {
    const thisCard = card.current;
    VanillaTilt.init(card.current);

    return () => {
      thisCard.vanillaTilt.destroy();
    };
  }, []);

  return (
    <article ref={card} className={styles.movie}>
      <Link to={`movies/${data._id}`}>
        <img src={data.Poster} alt="Poster" />
        <h2>{data.Title}</h2>
      </Link>
    </article>
  );
}
