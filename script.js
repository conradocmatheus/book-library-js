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
			this.isBorrowed = false;
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

class Library {
	constructor(collection, users) {
		this.collection = collection;
		this.users = users;
	}

	addUser(user) {
		this.users.push(user);
	}

	removeUser(user) {
		this.users = this.users.filter((item) => item !== user);
	}

	addEntity(entity) {
		this.collection.push(entity);
	}

	removeEntity(entity) {
		this.collection = this.collection.filter((item) => item !== entity);
	}

	borrowEntity(entity, user) {
		if (this.collection.includes(entity)) {
			entity.borrowBook(user);
		} else {
			console.log("This entity is not in the collection");
		}
	}

	returnEntity(entity) {
		if (this.collection.includes(entity)) {
			entity.returnBook();
		} else {
			console.log("This entity is not in the collection");
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

class User {
	constructor(name, academicRegister, birthDate) {
		this.name = name;
		this.academicRegister = academicRegister;
		this.birthDate = new Date(birthDate);
	}
	getBirthDate() {
		return this.birthDate.toISOString().split("T")[0]; // Returns date in "YYYY-MM-DD" format
	}
}
