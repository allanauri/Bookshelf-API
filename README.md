[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?style=flat)](https://github.com/ellerbrock/open-source-badges/)
![Dicoding](https://img.shields.io/badge/Dicoding-BackEnd-blue?logo=github&color=%23F7DF1E)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?logo=github&color=%23F7DF1E)](https://github.com/devancakra/Bookshelf-Apps/blob/master/LICENSE)
![GitHub last commit](https://img.shields.io/github/last-commit/allanauri/Bookshelf-API)
![JS](https://img.shields.io/badge/Javascript%20-%23323330.svg?&style=flat&logo=javascript&logoColor=%23F7DF1E&color=008080)
<br>
# Bookshelf-API 📚
Dicoding submission : "Belajar Membuat Aplikasi Back-End untuk Pemula"
<br>

## Terdapat 7 kriteria utama yang harus Anda penuhi dalam membuat proyek Bookshelf API.

### Kriteria 1 : Aplikasi menggunakan port 9000
1. Aplikasi yang Anda buat harus menggunakan port 9000. Jika komputer yang Anda gunakan untuk membuat submission tidak bisa memakai port 9000, buatlah submission dengan port lain, lalu ketika submission hendak dikirimkan silakan ganti portnya ke 9000.

### Kriteria 2 : Aplikasi dijalankan dengan perintah npm run start.
2. Aplikasi yang Anda buat harus memiliki runner script start. Cara membuatnya, Anda tambahkan properti start ke dalam properti scripts pada package.json seperti berikut:
```javascript
{
  "name": "submission",
  ...
  "scripts": {
    "start": "node src/server.js",
  }
}
```
Pastikan aplikasi tidak dijalankan dengan menggunakan nodemon. Jika Anda ingin menggunakan nodemon dalam proses development, masukkan nodemon kedalam runner script lain, contohnya:
```javascript
{
  "name": "submission",
  ...
  "scripts": {
    "start": "node src/server.js",
    "start-dev": "nodemon src/server.js",
  }
}
```
### Kriteria 3 : API dapat menyimpan buku
3. API yang Anda buat harus dapat menyimpan buku melalui route:
```javascript
Method : POST
URL : /books
Body Request:

{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```
Objek buku yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini:
```javascript
{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}
```
Server harus merespons gagal bila:

Client tidak melampirkan properti namepada request body. Bila hal ini terjadi, maka server akan merespons dengan:
```javascript
Status Code : 400
Response Body:

{
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```
Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
```javascript
Status Code : 400
Response Body:

{
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```
Bila buku berhasil dimasukkan, server harus mengembalikan respons dengan:
```javascript
Status Code : 201
Response Body:

{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": "1L7ZtDUFeGs7VlEt"
    }
}
```

### Kriteria 4 : API dapat menampilkan seluruh buku
4. API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui route:

Method : GET
URL: /books

Server harus mengembalikan respons dengan:
```javascript
Status Code : 200
Response Body:

{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
}
```
Jika belum terdapat buku yang dimasukkan, server bisa merespons dengan array books kosong.
```javascript
{
    "status": "success",
    "data": {
        "books": []
    }
}
```

### Kriteria 5 : API dapat menampilkan detail buku
5. API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui route:
```javascript
Method : GET
URL: /books/{bookId}
```
Bila buku dengan id yang dilampirkan oleh client tidak ditemukan, maka server harus mengembalikan respons dengan:
```javascript
Status Code : 404
Response Body:

{
    "status": "fail",
    "message": "Buku tidak ditemukan"
}
```
Bila buku dengan id yang dilampirkan ditemukan, maka server harus mengembalikan respons dengan:
```javascript
Status Code : 200
Response Body:

{
    "status": "success",
    "data": {
        "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
    }
}
```

### Kriteria 6 : API dapat mengubah data buku
6. API yang Anda buat harus dapat mengubah data buku berdasarkan id melalui route:
```javascript
Method : PUT
URL : /books/{bookId}
Body Request:

{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```
Server harus merespons gagal bila:

Client tidak melampirkan properti name pada request body. Bila hal ini terjadi, maka server akan merespons dengan:
```javascript
Status Code : 400
Response Body:

{
    "status": "fail",
    "message": "Gagal memperbarui buku. Mohon isi nama buku"
}
```
Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
```javascript
Status Code : 400
Response Body:

{
    "status": "fail",
    "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
}
```
Id yang dilampirkan oleh client tidak ditemukkan oleh server. Bila hal ini terjadi, maka server akan merespons dengan:
```javascript
Status Code : 404
Response Body:

{
    "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
}
```
Bila buku berhasil diperbarui, server harus mengembalikan respons dengan:
```javascript
Status Code : 200
Response Body:

{
    "status": "success",
    "message": "Buku berhasil diperbarui"
}
```

### Kriteria 7 : API dapat menghapus buku
7. API yang Anda buat harus dapat menghapus buku berdasarkan id melalui route berikut:
```javascript
Method : DELETE
URL: /books/{bookId}
Bila id yang dilampirkan tidak dimiliki oleh buku manapun, maka server harus mengembalikan respons berikut:

Status Code : 404
Response Body:

{
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```
Bila id dimiliki oleh salah satu buku, maka buku tersebut harus dihapus dan server mengembalikan respons berikut:
```javascript
Status Code : 200
Response Body:

{
    "status": "success",
    "message": "Buku berhasil dihapus"
}
```
