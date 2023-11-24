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
			console.log(this.collection); // mostra a coleção no console
		} catch (error) {
			// caso ocorra um erro
			console.error("Error:", error); // mostra o erro no console
		}
	}

	async populateUsers() {
		try {
			const response = await fetch(
				"https://api-biblioteca-mb6w.onrender.com/users"
			);
			const data = await response.json();
			this.users = data;
			console.log(this.users);
		} catch (error) {
			console.error("Error:", error);
		}
	}
}

const library = new Library(); // cria uma nova biblioteca
