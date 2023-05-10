import { COMMENTS_ID, generateItem, getRandomInteger} from '../utils.js';

const AUTHORS = ['Tom Ford', 'Nikita Mihalkov', 'Fedor Bondarchuk', 'Makoto Sinkai'];
const COMMENTS_LIST = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];
const EMOJI = ['smile', 'sleeping', 'puke', 'angry'];

const idList = COMMENTS_ID.slice();

const generateId = (id) => {
  const randomIndex = getRandomInteger(0, id.length - 1);
  return id.splice(randomIndex, 1).join('');
};

export const generateComment = () => ({
  id: generateId(idList),
  author: generateItem(AUTHORS),
  comment: generateItem(COMMENTS_LIST),
  date: '2019-05-11T16:12:32.554Z',
  emotion: generateItem(EMOJI),
});
