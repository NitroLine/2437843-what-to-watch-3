import {FilmsList} from './films-list';
import {ShowMoreButton} from './show-more-button';
import {FilmWithPreview} from '../../types/film';
import {useState} from 'react';
import {FILMS_PAGE_SIZE, INIT_FILMS_LIMIT} from '../../consts';

type FilmsListWithShowMoreProps = {
  films: Array<FilmWithPreview>;
}

export function FilmsListWithShowMore({films}: FilmsListWithShowMoreProps){
  const [showLimit, setShowLimit] = useState(INIT_FILMS_LIMIT);
  return (
    <>
      <FilmsList films={films.slice(0, showLimit)}/>
      {showLimit < films.length && <ShowMoreButton onClick={() => setShowLimit((prevState) => prevState + FILMS_PAGE_SIZE)}/>}
    </>
  );
}