import "./index.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BookCard from "./BookCard";
import { fetchBooks } from "../store/actions";
import AddBook from "./AddBook";

const BooksList = ({ books, fetchBooks }) => {
  useEffect(() => {
    fetchBooks();
  }, []);
  const [orderBy, setOrderBy] = useState("DSC");
  const renderedList = books
    .sort((a, b) => {
      if (orderBy === "ASC") {
        return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
      }
      return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
    })
    .map((book, index) => {
      return <BookCard book={book} key={index} />;
    });

  return (
    <div>
      <AddBook />
      <div class="inputfield-select">
        <label>Sorting Order</label>
        <div class="custom_select">
          <select
            onChange={(e) => {
              setOrderBy(e.target.value);
            }}
          >
            <option value="ASC">Ascending</option>
            <option value="DSC">Descending</option>
          </select>
        </div>
      </div>

      <div className="ui relaxed divided list">{renderedList}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps, {
  fetchBooks,
})(BooksList);
