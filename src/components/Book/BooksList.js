import React from "react";

const BooksList = ({
  isLoading,
  books,
  isLoggedIn,
  deleteBook,
  dispatch,
  getBookID,
}) => {
  const bookList =
    books.length > 0
      ? books.map((book) => (
          <li
            className="list-group-item d-flex  justify-content-between align-items-center"
            key={book.id}
          >
            <div>{book.tittle}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  getBookID(book.id);
                }}
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(deleteBook(book))
                    .unwrap()
                    .then((originalPromiseResult) => {
                      console.log(originalPromiseResult);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      console.log(rejectedValueOrSerializedError);
                    })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "There is no books available";
  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "Loading....." : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};

export default BooksList;
