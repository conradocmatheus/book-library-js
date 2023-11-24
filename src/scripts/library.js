class Library {
	// cria a classe biblioteca
	constructor(users) {
		// cria o construtor da classe biblioteca
		this.collection = []; // cria a coleção
		this.populateCollection();
		this.users = users;
	}

	populateCollection() {
		fetch("https://api-biblioteca-mb6w.onrender.com/acervo")
			.then((response) => response.json())
			.then((data) => {
				data.forEach((entity) => {
					this.collection.push(entity);
					console.log(entity);
				});
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	}

	addItem(item) {
		// metodo que adiciona um item a coleção
		this.collection.push(item);
	}

	listCollection() {
		// metodo que lista a coleção
		console.log(this.collection);
	}

	addUser(user) {
		// metodo que adiciona um usuario a coleção
		this.users.push(user);
	}

	borrowItem(code, user) {
		// metodo que empresta um item da coleção
		let item = this.collection.find((item) => item.code === code); // procura o item pelo codigo
		if (item) {
			item.borrowBook(user);
		} else {
			console.log("Item not found");
		}
	}

	returnItem(code) {
		// metodo que devolve um item da coleção
		let item = this.collection.find((item) => item.code === code); // procura o item pelo codigo
		if (item) {
			item.returnBook();
		} else {
			console.log("Item not found");
		}
	}
}

class LibraryEntity extends Library {
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

class User extends Library {
	// cria a classe usuario que herda da classe biblioteca
	constructor(name, academicRegister, birthDate) {
		// cria o construtor da classe usuario
		this.name = name;
		this.academicRegister = academicRegister;
		this.birthDate = new Date(birthDate); // Converte a data de nascimento para o tipo Date
	}
	getBirthDate() {
		// metodo que retorna a data de nascimento
		return this.birthDate.toISOString().split("T")[0]; // Retorna a data no formato YYYY-MM-DD
	}
}

class Enum extends Library {
	// cria a classe enum que herda da classe biblioteca
	constructor(suspense, romance, drama, horror, action, comedy) {
		// cria o construtor da classe enum com os generos
		this.suspense = suspense;
		this.romance = romance;
		this.drama = drama;
		this.horror = horror;
		this.action = action;
		this.comedy = comedy;
	}
}
