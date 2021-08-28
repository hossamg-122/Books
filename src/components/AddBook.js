import "./index.css";
import React, { useState } from "react";
import { fetchBook } from "../store/actions";
import { connect } from "react-redux";
const AddBook = ({ fetchBook, errorMsg }) => {
  console.log(errorMsg);
  const [term, setTerm] = useState("");
  const onInputChange = (e) => {
    setTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBook(term);
    setTerm("");
  };

  return (
    <div class="wrapper-search">
      <div class="title">Add a Book by Open library ID number</div>
      <form class="form" onSubmit={handleSubmit}>
        <div class="inputfield">
          <label>BooK ID</label>
          <input
            type="text"
            class="input"
            onChange={onInputChange}
            value={term}
          />
        </div>
        {/* this condition to handle displaying the error msg to the user */}
        {errorMsg ? <p class="error">{errorMsg}</p> : null}

        <div class="inputfield">
          <input type="submit" value="ADD" class="btn" />
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    errorMsg: state.errorMsg.msg,
  };
};
export default connect(mapStateToProps, {
  fetchBook,
})(AddBook);
