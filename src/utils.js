import dayjs from 'dayjs';

const humanizeFilmReleaseDate = (releaseDate) => dayjs(releaseDate).format('YYYY');
const humanizeFilmDuration = (duration) => {
  const minutes = duration % 60;

  if (duration < 60) {
    return `${minutes}m`;
  } else {
    const hours = Math.trunc(duration / 60);
    return `${hours}h ${minutes}m`;
  }
};

export { humanizeFilmReleaseDate, humanizeFilmDuration };
