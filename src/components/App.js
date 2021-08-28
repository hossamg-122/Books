import React from "react";
import BooksList from "./BooksList";
import EditBook from "./EditBook";
import { BrowserRouter, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={BooksList} />
      <Route path="/books/:id/edit" exact component={EditBook} />
    </BrowserRouter>
  );
};

export default App;
