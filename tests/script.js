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

	async listCollection() {
		// metodo que lista a coleção
		console.log(this.collection); // APAGAR DEPOIS E LISTAR NO HTML
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
		let academicRegisterInput = prompt("Digite a matricula do usuario:"); // pede a matricula do usuario
		let dateInput = prompt("Digite a data de nascimento do usuario:");
		let [day, month, year] = dateInput.split("-");
		let birthDateInput = new Date(year, month - 1, day);

		let user = {
			// cria um objeto com os dados do usuario
			name: userNameInput,
			academicRegister: academicRegisterInput,
			birthDate: birthDateInput,
		};
		this.users.push(user); // adiciona o usuario a coleção
	}

	//addItem(item) {}

	borrowItem() {
		// metodo que empresta um item da coleção
	}

	returnItem() {
		// metodo que devolve um item da coleção
	}
}

const library = new Library(); // cria uma nova biblioteca
