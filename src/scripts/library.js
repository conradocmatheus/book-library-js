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
