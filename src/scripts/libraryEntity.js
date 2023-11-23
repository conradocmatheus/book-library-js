class libraryEntity {
	constructor(title, author, pubDate, code) {
		this.title = title;
		this.author = author;
		this.pubDate = pubDate;
		this.code = code;
		this.isBorrowed = false;
		this.userBorrower = null;
	}

	borrowBook(user) {
		if (this.isBorrowed) {
			console.log("This Book is already borrowed");
			this.isBorrowed = true;
		} else {
			console.log("You have just borrowed this book");
			this.userBorrower = user;
			this.isBorrowed = true;
		}
	}

	returnBook() {
		if (this.isBorrowed) {
			console.log("You have just returned this book");
			this.isBorrowed = false;
			this.userBorrower = null;
		} else {
			console.log("This Book is not borrowed");
		}
	}
}

class Book extends libraryEntity {
	constructor(title, author, pubDate, code) {
		super(title, author, pubDate, code, genre);
		this.genre = genre;
	}
}

class Magazine extends libraryEntity {
	constructor(title, author, pubDate, code) {
		super(title, author, pubDate, code);
	}
}
