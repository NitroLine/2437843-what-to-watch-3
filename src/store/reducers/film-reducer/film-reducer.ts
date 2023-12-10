import {createSlice} from '@reduxjs/toolkit';
import {ReducerName} from '../reducer-types';
import {setGenreFilter} from '../../action';
import {ALL_GENRES} from '../../../consts';
import {
  addReview, fetchFavoriteFilms,
  fetchFilm,
  fetchFilms,
  fetchPromo,
  fetchReviews,
  fetchSimilar,
  setFavoriteStatus
} from '../../api/api-actions';
import {FilmReducerState} from '../../../types/reducers/film-reducer-state';

const initialState: FilmReducerState = {
  genreFilter: ALL_GENRES,
  genreFilteredFilms: [],
  films: [],
  similarFilms: [],
  genres: [ALL_GENRES],
  isLoading: false,
  promoFilm: null,
  selectedFilm: null,
  reviews: [],
  favoriteFilms: [],
};

export const filmReducer = createSlice({
  name: ReducerName.Film,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setGenreFilter, (state, {payload}) => {
        state.genreFilter = payload;
        state.genreFilteredFilms = state.films.filter((film) => state.genreFilter === ALL_GENRES || film.genre === state.genreFilter);
      })
      .addCase(fetchFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.genreFilteredFilms = state.films.filter((film) => state.genreFilter === ALL_GENRES || film.genre === state.genreFilter);
        state.genres = [ALL_GENRES, ...new Set(state.films.map((film) => film.genre))];
        state.isLoading = false;
      })
      .addCase(fetchFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.selectedFilm = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(addReview.fulfilled, (state, {payload}) => {
        state.reviews = state.reviews.concat(payload);
      })
      .addCase(setFavoriteStatus.fulfilled, (state, {payload}) => {
        state.selectedFilm = payload;
        if (payload.isFavorite) {
          state.favoriteFilms.push(payload);
        } else {
          state.favoriteFilms = state.favoriteFilms.filter((film) => film.id !== payload.id);
        }
        if (state.promoFilm?.id === payload.id){
          state.promoFilm = payload;
        }
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, {payload}) => {
        state.favoriteFilms = payload;
      });
  },
});
