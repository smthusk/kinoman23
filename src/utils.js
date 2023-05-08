import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeFilmReleaseDate = (releaseDate) => dayjs(releaseDate).format('YYYY');
const humanizeFilmReleaseDatePopup = (releaseDate) => dayjs(releaseDate).format('DD MMMM YYYY');
const humanizeDateComment = (commentDate) => dayjs(commentDate).format('YYYY/MM/DD HH:MM');
const humanizeFilmDuration = (duration) => {
  const minutes = duration % 60;

  if (duration < 60) {
    return `${minutes}m`;
  } else {
    const hours = Math.trunc(duration / 60);
    return `${hours}h ${minutes}m`;
  }
};

export { getRandomInteger, humanizeFilmReleaseDate, humanizeFilmDuration, humanizeFilmReleaseDatePopup, humanizeDateComment };
