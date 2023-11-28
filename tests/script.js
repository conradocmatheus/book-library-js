class Library {
	// cria a classe biblioteca
	constructor() {
		//  cria o construtor da classe biblioteca
		this.users = []; // cria a coleção de usuarios
		this.collection = []; // cria a coleção de itens
		this.populateCollection(); // chama o metodo que popula a coleção
		this.populateUsers(); // chama o metodo que popula os usuarios
	}

	async populateUsers() {
		// metodo que popula os usuarios
		try {
			// tenta fazer a requisição
			const response = await fetch(
				// faz a requisição
				"https://api-biblioteca-mb6w.onrender.com/users"
			);
			const data = await response.json(); // transforma a resposta em json
			this.users = data.map((user) => ({
				name: user.nome,
				academicRegister: user.registroAcademico,
				birthDate: user.dataNascimento,
			})); // atribui a resposta a coleção
		} catch (error) {
			//  caso ocorra um erro
			console.error("Error:", error); // mostra o erro no console
		}
	}

	async listUsers() {
		// metodo que lista os usuarios
		console.log(this.users); // APAGAR DEPOIS E LISTAR NO HTML
	}

	addUser() {
		// metodo que adiciona um usuario a coleção
		let userNameInput = prompt("Digite o nome do usuario:"); // pede o nome do usuario
		let userAcademicRegisterInput = prompt("Digite a matricula do usuario:"); // pede a matricula do usuario
		let userBirthDateInput = prompt("Digite a data de nascimento do usuario:"); // devo arrumar o formato da data

		let newUser = new User(
			userNameInput,
			userAcademicRegisterInput,
			userBirthDateInput
		); // cria um novo usuario
		this.users.push(newUser); // adiciona o usuario a coleção
	}

	async populateCollection() {
		// metodo que popula a coleção
		try {
			// tenta fazer a requisição
			const response = await fetch(
				// faz a requisição
				"https://api-biblioteca-mb6w.onrender.com/acervo"
			);
			const data = await response.json(); // transforma a resposta em json
			this.collection = data; // atribui a resposta a coleção
		} catch (error) {
			// caso ocorra um erro
			console.error("Error:", error); // mostra o erro no console
		}
	}

	async listCollection() {
		// metodo que lista a coleção
		console.log(this.collection); // APAGAR DEPOIS E LISTAR NO HTML
	}

	addItem(item) {
		// metodo que adiciona um item a coleção
		itemTypeOption = document.getElementById("itemType"); // pega o tipo de item selecionado
		itemTitleInput = prompt("Digite o titulo do item:"); // pede o titulo do item
		itemAuthorInput = prompt("Digite o autor do item:"); // pede o autor do item
		itemPubDateInput = prompt("Digite a data de publicação do item:"); // pede a data de publicação do item
		itemCodeInput = prompt("Digite o codigo do item:"); // pede o codigo do item
		let newItem;
		if (itemTypeOption == "book") {
			itemGenreInput = prompt("Digite o genero do livro:"); // pede o genero do livro
			newItem = new Book(
				itemTypeOption,
				itemTitleInput,
				itemAuthorInput,
				itemGenreInput,
				itemPubDateInput,
				itemCodeInput
			); // cria um novo livro
		} else if (itemTypeOption == "magazine") {
			newItem = new Magazine(
				itemTypeOption,
				itemTitleInput,
				itemAuthorInput,
				itemPubDateInput,
				itemCodeInput
			); // cria uma nova revista
		}
		this.collection.push(item); // adiciona o item a coleção
	}

	borrowItem() {
		// metodo que empresta um item da coleção
	}

	returnItem() {
		// metodo que devolve um item da coleção
	}
}

class User extends Library {
	// cria a classe usuario
	constructor(userName, userAcademicRegister, userBirthDate) {
		// cria o construtor da classe usuario
		this.userName = userName; // atribui o nome do usuario
		this.userAcademicRegister = userAcademicRegister; // atribui a matricula do usuario
		this.userBirthDate = userBirthDate; // atribui a data de nascimento do usuario
	}
}

class BibliographicEntity extends Library {
	// cria a classe entidade bibliografica
	constructor(itemType, itemTitle, itemAuthor, itemPubDate, itemCode) {
		// cria o construtor da classe entidade bibliografica
		this.itemType = itemType; // atribui o tipo de item
		this.itemTitle = itemTitle;
		this.itemAuthor = itemAuthor;
		this.itemPubDate = itemPubDate;
		this.itemCode = itemCode;
		isBorrowed = false;
		userBorrower = null;
	}
}

class Book extends BibliographicEntity {
	// cria a classe Book que herda da classe BibliographicEntity
	constructor(itemType, itemTitle, itemAuthor, itemPubDate, itemCode) {
		// cria o construtor da classe Book
		super(itemType, itemTitle, itemAuthor, itemPubDate, itemCode); // chama o construtor da classe BibliographicEntity
		this.genre = genre;
	}
}

class Magazine extends BibliographicEntity {
	// cria a classe Magazine que herda da classe BibliographicEntity
	constructor(itemType, itemTitle, itemAuthor, itemPubDate, itemCode) {
		// cria o construtor da classe Magazine
		super(itemType, itemTitle, itemAuthor, itemPubDate, itemCode); // chama o construtor da classe BibliographicEntity
	}
}

const library = new Library(); // cria uma nova biblioteca
