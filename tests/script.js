class Library {
	// cria a classe biblioteca
	constructor() {
		//  cria o construtor da classe biblioteca
		this.users = []; // cria a coleção de usuarios
		this.collection = []; // cria a coleção de itens
		this.populateCollection(); // chama o metodo que popula a coleção
		this.populateUsers(); // chama o metodo que popula os usuarios
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

	async populateUsers() {
		// metodo que popula os usuarios
		try {
			// tenta fazer a requisição
			const response = await fetch(
				// faz a requisição
				"https://api-biblioteca-mb6w.onrender.com/users"
			);
			const data = await response.json(); // transforma a resposta em json
			this.users = data; // atribui a resposta a coleção
		} catch (error) {
			//  caso ocorra um erro
			console.error("Error:", error); // mostra o erro no console
		}
	}

	addItem(item) {}

	async listCollection() {
		// metodo que lista a coleção
		await this.populateCollection();
		console.log(this.collection);
	}

	async listUsers() {
		// metodo que lista os usuarios
		await this.populateUsers();
		console.log(this.users);
	}

	addUser() {
		// metodo que adiciona um usuario a coleção
	}

	borrowItem() {
		// metodo que empresta um item da coleção
	}

	returnItem() {
		// metodo que devolve um item da coleção
	}
}

const library = new Library(); // cria uma nova biblioteca
library.listCollection(); // lista a coleção no console
library.listUsers(); // lista os usuarios no console
