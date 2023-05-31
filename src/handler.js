/* Import nanoid for generate unique character from package
and import array books from books.js */
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const
    {
      name, year, author, summary, publisher, pageCount,
      readPage, reading,
    } = request.payload;

  const id = nanoid(16);

  /* Create a finished variable that checked
  if the book was finished reading or not. */
  const finished = pageCount === readPage;
  // Return true if pageCount are same with readPage

  // Create insertedAt variable and import datetime with specified format
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // If the name property in the body request is not found, then return 404.
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);

    return response;
  }

  // If the readPage value is more than pageCount, then return 404.
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);

    return response;
  }

  // Push request to the new array
  books.push(newBook);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);

  return response;
};
const getAllBooksHandler = (request, h) => {
  // Create name, reading, finished request query
  const { name, reading, finished } = request.query;

  let filteredBooks = books; // Assuming `books` is the array of all books

  // Filtering books name based on name query, for example (books?name=Dicoding)
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book
      .name.toLowerCase().includes(name.toLowerCase()));
  }

  // Filtering books based on reading query, for example (books?reading=0)
  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === !!Number(reading),
    );
  }

  // Filtering books based on finished query, for example (books?finished=1)
  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === !!Number(finished),
    );
  }

  const response = h.response({
    status: 'success',
    // Mapping filteredBooks object only showing id, name, and publisher.
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);

  return response;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  // Filtering books object with bookId parameter
  const book = books.filter((n) => n.id === bookId)[0];

  // If bookId not empty then response success
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  // Else if bookId not available then response fail (404)
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Create edit handler for update a specified book by bookId
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // If name property not available then response fail (400)
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // If readPage value more than pageCount then response fail (400)
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  // Obtain index from books object and match with bookId parameter.
  const index = books.findIndex((book) => book.id === bookId);

  // Check index value, make sure the index isn't -1
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  // Splice books array if index isn't -1
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);

  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
