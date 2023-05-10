import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffleArray = (arr) => {
  const shuffledArray = arr.slice();
  for (let i = 0; i < shuffledArray.length; i++) {
    const randomIndex = getRandomInteger(1, shuffledArray.length - 1);
    const curr = shuffledArray[i];
    shuffledArray[i] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = curr;
  }
  return shuffledArray;
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

function generateId() {
  return [...Array(5).keys()].map(() => nanoid(5));
}
const COMMENTS_ID = generateId();

const generateItem = (arrayItems) => {
  const randomIndex = getRandomInteger(0, arrayItems.length - 1);
  return arrayItems[randomIndex];
};

const generateMultipleItems = (arrayItems) => shuffleArray(arrayItems).slice(0, getRandomInteger(1, arrayItems.length - 1));

export { getRandomInteger, shuffleArray, humanizeFilmReleaseDate, humanizeFilmDuration, humanizeFilmReleaseDatePopup, humanizeDateComment, COMMENTS_ID, generateItem, generateMultipleItems };
