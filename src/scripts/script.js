class Library {
	constructor() {
		this.users = [];
		this.collection = [];
		this.populateUsers();
		this.populateCollection();
	}

	// DONE
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
	// DONE

	// DONE
	listUsers() {
		const usersTable = document
			.getElementById("usersTable")
			.getElementsByTagName("tbody")[0];

		usersTable.innerHTML = "";
		this.users.forEach((user) => {
			console.log(user); // Log the User object to the console

			let row = usersTable.insertRow();

			let nameCell = row.insertCell();
			let academicRegisterCell = row.insertCell();
			let birthDateCell = row.insertCell();

			nameCell.textContent = user.userName;
			academicRegisterCell.textContent = user.userAcademicRegister;
			birthDateCell.textContent = user.userBirthDate;
		});
	}
	// DONE

	// DONE
	addUser() {
		let userFirstNameInput = document.getElementById("inputFirstName");
		let userLastNameInput = document.getElementById("inputLastName");
		let userAcademicRegisterInput = document.getElementById("inputAR");
		for (let i = 0; i < this.users.length; i++) {
			if (
				this.users[i].userAcademicRegister === userAcademicRegisterInput.value
			) {
				alert("Academic Register already in use");
				return;
			}
		}
		let userBirthDateInput = document.getElementById("inputBdate");
		if (
			!userFirstNameInput.value ||
			!userLastNameInput.value ||
			!userAcademicRegisterInput.value ||
			!userBirthDateInput.value
		) {
			alert("All fields must be filled out");
			return;
		}

		let userNameInput = `${userFirstNameInput.value} ${userLastNameInput.value}`;

		let newUser = new User(
			userNameInput,
			userAcademicRegisterInput.value,
			userBirthDateInput.value
		);
		this.users.push(newUser);

		userFirstNameInput.value = "";
		userLastNameInput.value = "";
		userAcademicRegisterInput.value = "";
		userBirthDateInput.value = "";
		this.listUsers();
	}
	// DONE

	// NO WORK NEEDED FOR NOW
	async populateCollection() {
		try {
			const response = await fetch(
				"https://api-biblioteca-mb6w.onrender.com/acervo"
			);
			const data = await response.json();

			this.collection = data.map((item) => {
				if (item.entidadeBibliografica === "Livro") {
					return new Book(
						item.codigo,
						item.titulo,
						item.autor,
						item.anoPublicacao,
						item.entidadeBibliografica,
						item.genero,
						item.emprestado,
						item.usuarioEmprestimo
					);
				} else if (item.entidadeBibliografica === "Revista") {
					return new Magazine(
						item.codigo,
						item.titulo,
						item.autor,
						item.anoPublicacao,
						item.entidadeBibliografica,
						item.edicao,
						item.emprestado,
						item.usuarioEmprestimo
					);
				}
			});
			console.log(this.collection);
		} catch (error) {
			console.error("Error:", error);
		}
	}
	// NO WORK NEEDED FOR NOW

	// NO WORK NEEDED FOR NOW
	listCollection() {
		const collectionTable = document
			.getElementById("collectionTable")
			.getElementsByTagName("tbody")[0];

		collectionTable.innerHTML = "";
		this.collection.forEach((item) => {
			let row = collectionTable.insertRow();

			let codeCell = row.insertCell();
			let titleCell = row.insertCell();
			let authorCell = row.insertCell();
			let pubDateCell = row.insertCell();
			let typeCell = row.insertCell();
			let genreEditionCell = row.insertCell();
			let borrowedCell = row.insertCell();
			let borrowerCell = row.insertCell();

			codeCell.textContent = item.itemCode;
			titleCell.textContent = item.itemTitle;
			authorCell.textContent = item.itemAuthor;
			pubDateCell.textContent = item.itemPubDate;
			typeCell.textContent = item.itemType;
			genreEditionCell.textContent =
				item.itemType === "Livro" ? item.itemGenre : item.itemEdition;
			borrowedCell.textContent = item.isBorrowed;
			borrowerCell.textContent =
				item.userBorrower === null ? "None" : item.userBorrower;
		});
	}
	// NO WORK NEEDED FOR NOW

	addCollectionItem() {
		let itemType = document.getElementById("inputItemType");
		let itemTitle = document.getElementById("inputItemTitle");
		let itemAuthor = document.getElementById("inputItemAuthor");
		let itemPubDate = document.getElementById("inputItemPubYear");
		if (itemPubDate.value < 0 || itemPubDate.value > 2023) {
			alert("Invalid publication year");
			return;
		}
		let itemGenre = document.getElementById("inputItemGenre");
		let itemEdition = document.getElementById("inputItemEdition");
		let itemCode = document.getElementById("inputItemCode");
		for (let i = 0; i < this.collection.length; i++) {
			if (this.collection[i].itemCode === itemCode.value) {
				alert("Item Code already in use");
				return;
			}
		}
		if (
			!itemType.value ||
			!itemTitle.value ||
			!itemAuthor.value ||
			!itemPubDate.value ||
			!itemCode.value ||
			!itemGenre.value ||
			!itemEdition.value
		) {
			alert("All fields must be filled out");
			return;
		}
	}
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
	constructor(itemCode, itemTitle, itemAuthor, itemPubDate, itemType) {
		this.itemCode = itemCode;
		this.itemTitle = itemTitle;
		this.itemAuthor = itemAuthor;
		this.itemPubDate = itemPubDate;
		this.isBorrowed = false;
		this.userBorrower = null;
		this.itemType = itemType;
	}
}

class Book extends BibliographicEntity {
	constructor(
		itemCode,
		itemTitle,
		itemAuthor,
		itemPubDate,
		itemType,
		itemGenre
	) {
		super(itemCode, itemTitle, itemAuthor, itemPubDate, itemType);
		this.itemGenre = itemGenre;
	}
}

class Magazine extends BibliographicEntity {
	constructor(
		itemCode,
		itemTitle,
		itemAuthor,
		itemPubDate,
		itemType,
		itemEdition
	) {
		super(itemCode, itemTitle, itemAuthor, itemPubDate, itemType);
		this.itemEdition = itemEdition;
	}
}

const library = new Library();
