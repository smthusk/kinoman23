import {getRandomInteger} from '../utils.js';
import { nanoid } from 'nanoid';

const generateAuthor = () => {
  const authors = [
    'Tom Ford',
    'Nikita Mihalkov',
    'Fedor Bondarchuk',
    'Makoto Sinkai',
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateCommentText = () => {
  const commentsList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
  ];
  const randomIndex = getRandomInteger(0, commentsList.length - 1);

  return commentsList[randomIndex];
};

const generateEmoji = () => {
  const emoji = ['smile', 'sleeping', 'puke', 'angry'];

  const randomIndex = getRandomInteger(0, emoji.length - 1);

  return emoji[randomIndex];
};

export const generateComment = () => ({
  id: nanoid(),
  author: generateAuthor(),
  comment: generateCommentText(),
  date: '2019-05-11T16:12:32.554Z',
  emotion: generateEmoji(),
});
