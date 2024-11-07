const { configureStore } = require("@reduxjs/toolkit");
const { bookApi } = require("./Api/BookData");

const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export default store;
