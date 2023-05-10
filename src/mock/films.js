import { getRandomInteger, shuffleArray, COMMENTS_ID, generateItem, generateMultipleItems } from '../utils.js';
import { nanoid } from 'nanoid';

const DIRECTORS = ['Tom Ford', 'Nikita Mihalkov', 'Fedor Bondarchuk', 'Makoto Sinkai'];
const WRITERS = ['John Smith', 'Ridley Scott', 'Vasiliy Pupkin', 'Platon Shukin'];
const ACTORS = ['Pedro Pascal', 'Ura Borisov', 'Sasha Bortich', 'Rachel McAdams'];
const TITLES = ['T-34', 'Mister Knockout', 'Stargate', 'Dune', 'In Time', 'Mission Impossible', 'I Origins'];
const COUNTRIES = ['Russia', 'Spain', 'France', 'China', 'India', 'Indonesia', 'Italy', 'USA'];
const GENRES = ['Comedy', 'Action', 'Thriller', 'Drama', 'Horror', 'Noir', 'Detective'];

const generatePoster = () => {
  const POSTERS = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, POSTERS.length - 1);

  return `./images/posters/${POSTERS[randomIndex]}`;
};

const generateDescription = () => {
  const fish = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  return shuffleArray(fish.split('. ')).slice(0, getRandomInteger(1, 5)).join('. ');
};

const idList = COMMENTS_ID.slice();

const generateCommentsId = (id) => {
  const randomIndex = getRandomInteger(0, id.length - 1);
  return shuffleArray(id).slice(0, randomIndex);
};

export const generateFilm = () => ({
  id: nanoid(5),
  comments: generateCommentsId(idList),
  filmInfo: {
    title: generateItem(TITLES),
    alternativeTitle: generateItem(TITLES),
    totalRating: getRandomInteger(1, 10),
    poster: generatePoster(),
    ageRating: getRandomInteger(0, 18),
    director: generateItem(DIRECTORS),
    writers: generateMultipleItems(WRITERS),
    actors: generateMultipleItems(ACTORS),
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: generateMultipleItems(COUNTRIES),
    },
    duration: getRandomInteger(55, 175),
    genre: generateMultipleItems(GENRES),
    description: generateDescription(),
  },
  userDetails: {
    watchlist: true,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false,
  },
});
