import React, { useRef, useState } from "react";
import {
  useAddBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "../Store/Api/BookData";

const Crud = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null); // Track the book being edited
  const titleRef = useRef();
  const authorRef = useRef();

  const { data, error, isLoading } = useGetBooksQuery();
  const [addBook] = useAddBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const handleSubmit = () => {
    const newBook = {
      title: titleRef.current.value,
      author: authorRef.current.value,
    };
    addBook(newBook);
    titleRef.current.value = "";
    authorRef.current.value = "";
  };

  const handleDelete = (id) => {
    deleteBook(id);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    const updatedBook = {
      ...editingBook,
      title: titleRef.current.value,
      author: authorRef.current.value,
    };
    updateBook(updatedBook);
    setEditingBook(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Book Management</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <input
              type="text"
              placeholder="Title"
              className="p-2 border border-gray-300 rounded w-full"
              ref={titleRef}
            />
            <input
              type="text"
              placeholder="Author"
              ref={authorRef}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              onClick={handleSubmit}
            >
              Add Book
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((book) => (
                <tr key={book.id} className="border-t">
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-gray-800 text-white px-3 py-1 rounded mr-2 hover:bg-gray-700"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(book.id)}
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
            <h2 className="text-lg font-semibold mb-4">Edit Book</h2>
            <input
              type="text"
              placeholder="Title"
              className="p-2 border border-gray-300 rounded w-full mb-3"
              ref={titleRef}
              defaultValue={editingBook?.title}
            />
            <input
              type="text"
              placeholder="Author"
              className="p-2 border border-gray-300 rounded w-full mb-3"
              ref={authorRef}
              defaultValue={editingBook?.author}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crud;
