import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook } from "./../../store/bookSlice";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";

import "./book.css";

const PostContainer = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { isLoading, books } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, []);
  const getBookID = (id) => {
    const requiredBook = books.find((book) => book.id === id);
    console.log("requiredBook", requiredBook);
    setSelectedBook((prev) => {
      return { ...prev, ...requiredBook };
    });
  };
  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBook={deleteBook}
            dispatch={dispatch}
            getBookID={getBookID}
          />
        </div>
        <div className="col side-line">
          <BookInfo info={selectedBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
