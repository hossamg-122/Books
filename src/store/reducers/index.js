import { combineReducers } from "redux";
import { FETCHED_BOOKS, ADD_FETCHED_BOOK, ERROR_MESSAGE } from "../actions/type";
const booksReducer = (state = [], action) => {
  switch (action.type) {
    case FETCHED_BOOKS:
      return [...action.payload];
    case ADD_FETCHED_BOOK:
      return [action.payload, ...state];
    default:
      return state;
  }
};
const errorMessageReducer=(state={msg:null},action)=>{
  switch (action.type) {
    case ERROR_MESSAGE:
      return {...state,msg:action.payload};
   
    default:
      return state;
  }
}

 

export default combineReducers({
  books: booksReducer,
  errorMsg:errorMessageReducer,
});
