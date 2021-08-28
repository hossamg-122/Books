import openLibrary from "../../api/openLibrary";
import { fetchLocalBooks, setLocalBooks} from "../../utils";
import { FETCHED_BOOKS, ADD_FETCHED_BOOK, ERROR_MESSAGE } from "./type";
// this action is responsible to fetch our books from local storage and dispatch it to redux store
export const fetchBooks = () => {
  return async (dispatch) => {
    const books = fetchLocalBooks();

    dispatch({
      type: FETCHED_BOOKS,
      payload: books,
    });
  };
};
// this action is responsible to fetch our book from the api and store it at local storage 
export const fetchBook = (id) => {
  return async (dispatch) => {
    const books = fetchLocalBooks();
    const bookIds = books.map(({ id }) => id);

    if (!bookIds.includes(id)) {
      const { data } = await openLibrary.get(`/works/${id}.json`);
      const authorKey = data.authors[0].author.key
      const {data:authorData} = await openLibrary.get(`${authorKey}.json`)
      const {name:authorName} = authorData
      const book = {
        ...data,
        id,
        authorName
      };

      setLocalBooks([book, ...books]);

      dispatch({
        type: ADD_FETCHED_BOOK,
        payload: book,
      });
      // when we successfully fetch a new book this action sets the error msg to null to hide
      dispatch({
        type: ERROR_MESSAGE,
        payload: null
      })
    } else {
      // the book is already exists in our storage this action updates the state of the error msg to show it to the user
      dispatch({
        type: ERROR_MESSAGE,
        payload: 'This Book ID Is Already Exists Try Another One',
      })
    }
  };
};



