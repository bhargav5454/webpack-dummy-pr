import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Crud = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 2, title: "1984", author: "George Orwell" },
  ]);
  const [currentBook, setCurrentBook] = useState({ id: null, title: "", author: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveBook = () => {
    if (!currentBook.title || !currentBook.author) return;

    if (currentBook.id) {
      // Update book
      setBooks(books.map(book => (book.id === currentBook.id ? currentBook : book)));
    } else {
      // Add new book
      setBooks([...books, { ...currentBook, id: Date.now() }]);
    }

    resetForm();
  };

  const handleEditBook = (book) => {
    setCurrentBook(book);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setCurrentBook({ id: null, title: "", author: "" });
    setIsDialogOpen(false);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Title"
            value={currentBook.title}
            onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })}
          />
          <Input
            placeholder="Author"
            value={currentBook.author}
            onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })}
          />
          <Button onClick={handleSaveBook}>
            {currentBook.id ? "Update Book" : "Add Book"}
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => handleEditBook(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentBook.id ? "Edit Book" : "Add New Book"}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Title"
            value={currentBook.title}
            onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Author"
            value={currentBook.author}
            onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })}
            className="mb-2"
          />
          <Button onClick={handleSaveBook}>{currentBook.id ? "Update" : "Save"}</Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Crud;
