import { generateComment } from '../mock/comments.js';

const COMMENTS_COUNT = 5;

export default class CommentsModel {
  #comments = Array.from({ length: COMMENTS_COUNT }, generateComment);

  get comments() {
    return this.#comments;
  }
}
