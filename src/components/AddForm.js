import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertBook } from "../store/bookSlice";
const Addform = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  // refs
  // handle in one object
  const tittle = useRef(null);
  const price = useRef(null);
  const description = useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      tittle: tittle.current.value,
      price: price.current.value,
      description: description.current.value,
    };

    dispatch(insertBook(bookData));
    tittle.current.value = null;
    price.current.value = null;
    description.current.value = null;
  };
  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tittle">tittle</label>
            <input
              type="text"
              className="form-control"
              id="tittle"
              required
              ref={tittle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              ref={price}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              ref={description}
              className="form-control"
              id="Description"
              rows="3"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isLoggedIn}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
