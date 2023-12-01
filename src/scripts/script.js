const genres = [
	(HORROR = "Horror"),
	(COMEDY = "Comedy"),
	(THRILLER = "Thriller"),
	(DRAMA = "Drama"),
	(SUSPENSE = "Suspense"),
	(SCI_FI = "Sci-Fi"),
	(HISTORY = "History"),
];

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
		alert("User added to library");

		userFirstNameInput.value = "";
		userLastNameInput.value = "";
		userAcademicRegisterInput.value = "";
		userBirthDateInput.value = "";
		this.listUsers();
	}
	// DONE

	// DONE
	async populateCollection() {
		try {
			const response = await fetch(
				"https://api-biblioteca-mb6w.onrender.com/acervo"
			);
			const data = await response.json();

			this.collection = data.map((item) => {
				if (item.entidadeBibliografica === "Livro") {
					if (item.genero === "Terror") {
						item.genero = "Horror";
					}
					return new Book(
						item.codigo,
						item.titulo,
						item.autor,
						item.anoPublicacao,
						"Book",
						item.genero,
						item.emprestado,
						item.usuarioEmprestimo
					);
				} else if (item.entidadeBibliografica === "Revista") {
					if (item.edicao === "Março") {
						item.edicao = "March";
					}
					return new Magazine(
						item.codigo,
						item.titulo,
						item.autor,
						item.anoPublicacao,
						"Magazine",
						item.edicao,
						item.emprestado,
						item.usuarioEmprestimo
					);
				}
			});
		} catch (error) {
			console.error("Error:", error);
		}
	}
	// DONE

	// DONE
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
				item.itemType === "Book" ? item.itemGenre : item.itemEdition;
			borrowedCell.textContent = item.isBorrowed;
			borrowerCell.textContent =
				item.userBorrower === null ? "None" : item.userBorrower;
		});
	}
	// DONE

	// DONE
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
		if (itemType.value === "Book") {
			let newItem = new Book(
				itemCode.value,
				itemTitle.value,
				itemAuthor.value,
				itemPubDate.value,
				itemType.value,
				itemGenre.value
			);
			this.collection.push(newItem);
			alert("Book added to collection");
		} else if (itemType.value === "Magazine") {
			let newItem = new Magazine(
				itemCode.value,
				itemTitle.value,
				itemAuthor.value,
				itemPubDate.value,
				itemType.value,
				itemEdition.value
			);
			this.collection.push(newItem);
			alert("Magazine added to collection");
		}
		itemType.value = "";
		itemTitle.value = "";
		itemAuthor.value = "";
		itemPubDate.value = "";
		itemCode.value = "";
		itemGenre.value = "";
		itemEdition.value = "";
		this.listCollection();
	}
	// DONE

	borrowItem() {
		let borrowEntityCodeInput = document.getElementById(
			"inputEntityCodeBorrow"
		);
		let borrowUserRA = document.getElementById("inputUserRABorrow");
		if (borrowEntityCodeInput.value === "" || borrowUserRA.value === "") {
			alert("All fields must be filled out");
			return;
		}
		const findedItem = this.collection.find(
			(item) => item.itemCode === borrowEntityCodeInput.value
		);
		if (findedItem) {
			const findedUser = this.users.find(
				(user) => user.userAcademicRegister === borrowUserRA.value
			);
			if (findedUser) {
				findedItem.borrow(findedUser);
				this.listCollection();
			} else {
				alert("User not found");
				return;
			}
		} else {
			alert("Item not found");
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

	borrow(user) {
		if (this.isBorrowed) {
			alert("Item already borrowed");
			return;
		} else {
			this.isBorrowed = true;
			this.userBorrower = user.userAcademicRegister;
			alert("Item borrowed");
		}
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
