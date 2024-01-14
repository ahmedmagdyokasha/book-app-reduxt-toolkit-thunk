import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addLog } from "./reportSlice";
export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3009/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const insertBook = createAsyncThunk(
  "books/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      bookData.userName = getState().auth.name;
      const res = await fetch("http://localhost:3009/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(bookData),
      });
      const data = await res.json();
      dispatch(addLog({ name: "addBook", status: "success" }));
      return data;
    } catch (error) {
      dispatch(addLog({ name: "addBook", status: "Failed" }));

      return rejectWithValue(error.message);
    }
  }
);
export const deleteBook = createAsyncThunk(
  "books/deletBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3009/books/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    //getBOOKS
    builder.addCase(getBooks.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //INSERT BOOK
    builder.addCase(insertBook.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(insertBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    });
    builder.addCase(insertBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //Delete BOOK
    builder.addCase(deleteBook.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.books = state.books.filter((book) => book.id !== action.payload.id);
      // console.log(action);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export default bookSlice.reducer;
