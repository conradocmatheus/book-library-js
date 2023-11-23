class LibraryEntity {
	// cria a classe entidade da biblioteca
	constructor(title, author, pubDate, code) {
		// cria o construtor da classe entidade da biblioteca
		this.title = title;
		this.author = author;
		this.pubDate = pubDate;
		this.code = code;
		this.isBorrowed = false;
		this.userBorrower = null;
	}

	borrowBook(user) {
		// metodo que empresta um item da coleção
		if (this.isBorrowed) {
			// se o livro já estiver emprestado
			console.log("This Book is already borrowed");
			this.isBorrowed = true;
		} else {
			// se o livro não estiver emprestado
			console.log("You have just borrowed this book");
			this.userBorrower = user;
			this.isBorrowed = true;
		}
	}

	returnBook() {
		// metodo que devolve um item da coleção
		if (this.isBorrowed) {
			// se o livro estiver emprestado
			console.log("You have just returned this book");
			this.isBorrowed = false;
			this.userBorrower = null;
		} else {
			// se o livro não estiver emprestado
			console.log("This Book is not borrowed");
		}
	}
}

class Book extends LibraryEntity {
	// cria a classe Book que herda da classe LibraryEntity
	constructor(title, author, pubDate, code) {
		// cria o construtor da classe Book
		super(title, author, pubDate, code, genre); // chama o construtor da classe LibraryEntity
		this.genre = genre;
	}
}

class Magazine extends LibraryEntity {
	// cria a classe Magazine que herda da classe LibraryEntity
	constructor(title, author, pubDate, code) {
		// cria o construtor da classe Magazine
		super(title, author, pubDate, code); // chama o construtor da classe LibraryEntity
	}
}
