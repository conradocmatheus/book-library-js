class Library {
	// cria a classe biblioteca
	constructor(collection, users) {
		// cria o construtor da classe biblioteca
		this.collection = collection;
		this.users = users;
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
