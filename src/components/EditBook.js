import "./index.css";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import openLibrary from "../api/openLibrary";
import { fetchLocalBooks, setLocalBooks } from "../utils";
const EditBook = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const router = useHistory();

  useEffect(() => {
    const fetchBook = async () => {
      const books = fetchLocalBooks();
      const book = books.find((book) => book.id === id);

      if (book) {
        setBook(book);
      } else {
        const { data } = await openLibrary.get(`/works/${id}.json`);
        setBook(data);
      }
    };

    fetchBook();
  }, []);

  const onChangeField = (fieldKey, value) => {
    setBook({
      ...book,
      [fieldKey]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const books = fetchLocalBooks().map((localBook) => {
      if (localBook.id === id) {
        return book;
      }

      return localBook;
    });

    setLocalBooks(books);

    router.push("/");
  };

  return (
    <React.Fragment>
      {!book ? (
        <div> Loading ...</div>
      ) : (
        <div class="wrapper">
          <div class="title">Edit Book</div>
          <form class="form" onSubmit={handleSubmit}>
            <div class="inputfield">
              <label>BooK ID</label>
              <input
                type="text"
                class="input"
                readOnly
                value={book.key.replaceAll("/works/", "")}
              />
            </div>
            <div class="inputfield">
              <label>Title</label>
              <input
                placeholder="Book Title"
                type="text"
                class="input"
                defaultValue={book.title}
                onChange={({ target }) => onChangeField("title", target.value)}
              />
            </div>

            <div class="inputfield">
              <label>Author</label>
              <input
                placeholder="Author Name"
                type="text"
                class="input"
                defaultValue={book.authorName}
                onChange={({ target }) =>
                  onChangeField("authorName", target.value)
                }
              />
            </div>
            <div class="inputfield">
              <label>Published Year</label>
              <input
                type="text"
                class="input"
                defaultValue={book.publishedYear || ""}
                onChange={({ target }) =>
                  onChangeField("publishedYear", target.value)
                }
              />
            </div>
            <div class="inputfield">
              <label>Description</label>
              <textarea
                placeholder="Write Book Description"
                class="textarea"
                defaultValue={
                  typeof book.description === "string"
                    ? book.description
                    : book.description?.value
                }
                onChange={({ target }) =>
                  onChangeField("description", target.value)
                }
              ></textarea>
            </div>

            <div class="inputfield">
              <input type="submit" value="Update" class="btn" />
              <input
                type="submit"
                value="Cancel"
                class="btn"
                onClick={() => {
                  router.push("/");
                }}
              />
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditBook;
