import React, { useState } from "react";

const Crud = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 2, title: "1984", author: "George Orwell" },
  ]);
  const [currentBook, setCurrentBook] = useState({
    id: null,
    title: "",
    author: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveBook = () => {
    if (!currentBook.title || !currentBook.author) return;

    if (currentBook.id) {
      // Update book
      setBooks(
        books.map((book) => (book.id === currentBook.id ? currentBook : book))
      );
    } else {
      // Add new book
      setBooks([...books, { ...currentBook, id: Date.now() }]);
    }

    resetForm();
  };

  const handleEditBook = (book) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setCurrentBook({ id: null, title: "", author: "" });
    setIsModalOpen(false);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Book Management</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-1 mb-4">
            <input
              type="text"
              placeholder="Title"
              value={currentBook.title}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, title: e.target.value })
              }
              className="p-2 border border-gray-300 rounded w-[220px]"
            />
            <input
              type="text"
              placeholder="Author"
              value={currentBook.author}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, author: e.target.value })
              }
              className="p-2 border border-gray-300 rounded w-[220px]"
            />
            <button
              onClick={handleSaveBook}
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              Add Book
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-200 text-left text-gray-600">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-t">
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="bg-gray-800 text-white px-3 py-1 rounded mr-2 hover:bg-gray-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-lg font-semibold mb-4">
              {currentBook.id ? "Edit Book" : "Add New Book"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={currentBook.title}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, title: e.target.value })
              }
              className="p-2 border border-gray-300 rounded w-full mb-3"
            />
            <input
              type="text"
              placeholder="Author"
              value={currentBook.author}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, author: e.target.value })
              }
              className="p-2 border border-gray-300 rounded w-full mb-3"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBook}
                className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-900"
              >
                {currentBook.id ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crud;
