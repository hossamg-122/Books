import "./index.css";
import React from "react";
import { useHistory } from "react-router-dom";
import defaultCover from "./media/defaultCover.jfif";
const BookCard = ({ book }) => {
  const router = useHistory();

  // this func handles the description of the book as it's not stored at a fixed place in the api
  const description = (book) => {
    if (typeof book.description === "string") {
      return book.description;
    } else if ((book.description || {}).value) {
      return book.description.value;
    } else {
      return "There is no description about this book";
    }
  };
  // this func handles the cover of the book as there are books without cover photo
  const cover = (book) => {
    if (book.covers) {
      return `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`;
    } else {
      return defaultCover;
    }
  };
  return (
    <div
      class="card"
      onClick={() => {
        router.push(`/books/${book.key?.replaceAll("/works/", "")}/edit`);
      }}
    >
      <div class="profile-sidebar">
        <img class="profile-image" alt={book.title} src={cover(book)} />
      </div>
      <div class="profile-main">
        <h2 class="profile-name">{book.title} </h2>
        <p class="profile-position">Written By: {book.authorName}</p>
        <p class="profile-body">{description(book)}</p>
      </div>
    </div>
  );
};

export default BookCard;
