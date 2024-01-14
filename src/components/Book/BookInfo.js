import React, { Fragment } from "react";

const BookInfo = ({ info }) => {
  console.log("info : ", info);
  return (
    <Fragment>
      <h2>Book Details</h2>
      {info ? (
        <div>
          <p className="fw-bold">Title:{info.tittle}</p>
          <p className="fw-bold">Inserted By:{info.userName}</p>
          <p className="fw-light">Description:{info.description}</p>
          <p className="fst-italic">Price:{info.price}</p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no book selected yet. Please select!
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
