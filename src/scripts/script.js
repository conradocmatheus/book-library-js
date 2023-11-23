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

class Library {
	constructor(collection, users) {
		this.collection = collection;
		this.users = users;
	}

	addItem(item) {
		this.collection.push(item);
	}

	listCollection() {
		console.log(this.collection);
	}

	addUser(user) {
		this.users.push(user);
	}

	borrowItem(code, user) {
		let item = this.collection.find((item) => item.code === code);
		if (item) {
			item.borrowBook(user);
		} else {
			console.log("Item not found");
		}
	}

	returnItem(code) {
		let item = this.collection.find((item) => item.code === code);
		if (item) {
			item.returnBook();
		} else {
			console.log("Item not found");
		}
	}
}

class User {
	constructor(name, academicRegister, birthDate) {
		this.name = name;
		this.academicRegister = academicRegister;
		this.birthDate = new Date(birthDate);
	}
	getBirthDate() {
		return this.birthDate.toISOString().split("T")[0]; // Retorna a data no formato YYYY-MM-DD
	}
}
