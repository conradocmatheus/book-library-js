class Library {
	constructor() {
		this.users = [];
		this.collection = [];
		this.populateUsers();
	}

	// DONE FOR NOW
	async populateUsers() {
		try {
			const response = await fetch(
				"https://api-biblioteca-mb6w.onrender.com/users"
			);
			const data = await response.json();

			this.users = data.map(
				(user) =>
					new User(user.nome, user.registroAcademico, user.dataNascimento)
			);
		} catch (error) {
			console.error("Error:", error);
		}
	}
	// DONE FOR NOW

	// NEED TO WORK ON THIS
	async listUsers() {
		console.log(this.users); // APAGAR DEPOIS E LISTAR NO HTML
	}
	// NEED TO WORK ON THIS

	// NEED TO WORK ON THIS, ESPECIALLY THE DATE PART
	addUser() {
		let userNameInput = prompt("Digite o nome do usuario:");
		let userAcademicRegisterInput = prompt("Digite a matricula do usuario:");
		let userBirthDateInput = prompt("Digite a data de nascimento do usuario:"); // devo arrumar o formato da data

		let newUser = new User(
			userNameInput,
			userAcademicRegisterInput,
			userBirthDateInput
		);
		this.users.push(newUser);
	}
	// NEED TO WORK ON THIS, ESPECIALLY THE DATE PART
}

// NO WORK NEEDED FOR NOW
class User {
	constructor(userName, userAcademicRegister, userBirthDate) {
		this.userName = userName;
		this.userAcademicRegister = userAcademicRegister;
		this.userBirthDate = userBirthDate;
	}
}
// NO WORK NEEDED FOR NOW

class BibliographicEntity {
	constructor(itemCode, itemTitle, itemAuthor, itemPubDate) {
		this.itemCode = itemCode;
		this.itemTitle = itemTitle;
		this.itemAuthor = itemAuthor;
		this.itemPubDate = itemPubDate;
		this.isBorrowed = false;
		this.userBorrower = null;
	}
}

class Book extends BibliographicEntity {
	constructor(itemCode, itemTitle, itemAuthor, itemPubDate) {
		super(itemCode, itemTitle, itemAuthor, itemPubDate);
	}
}

class Magazine extends BibliographicEntity {
	constructor(itemCode, itemTitle, itemAuthor, itemPubDate) {
		super(itemCode, itemTitle, itemAuthor, itemPubDate);
	}
}

const library = new Library();
