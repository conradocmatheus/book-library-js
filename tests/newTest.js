class Library {
	constructor() {
		this.users = [];
		this.collection = [];
		this.populateUsers();
	}

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

	async listUsers() {
		// metodo que lista os usuarios
		console.log(this.users); // APAGAR DEPOIS E LISTAR NO HTML
	}

	addUser() {
		// metodo que adiciona um usuario a coleção
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
}

class User {
	// cria a classe usuario
	constructor(userName, userAcademicRegister, userBirthDate) {
		// cria o construtor da classe usuario
		this.userName = userName; // atribui o nome do usuario
		this.userAcademicRegister = userAcademicRegister; // atribui a matricula do usuario
		this.userBirthDate = userBirthDate; // atribui a data de nascimento do usuario
	}
}

class BibliographicEntity {
	// cria a classe entidade bibliografica
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
	// cria a classe Book que herda da classe BibliographicEntity
	constructor(itemCode, itemTitle, itemAuthor, itemPubDate) {
		super(itemCode, itemTitle, itemAuthor, itemPubDate);
	}
}

class Magazine extends BibliographicEntity {
	// cria a classe Magazine que herda da classe BibliographicEntity
	constructor(itemCode, itemTitle, itemAuthor, itemPubDate) {
		super(itemCode, itemTitle, itemAuthor, itemPubDate);
	}
}

const library = new Library();
