// we will store our books in local Storage
export const fetchLocalBooks = () => {
  let books = [];
  try {
    books = JSON.parse(localStorage.getItem("books")) || [];
  } catch (error) {
    //
  }

  return books;
};
// we will fetch our books in local Storage
export const setLocalBooks = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
};

