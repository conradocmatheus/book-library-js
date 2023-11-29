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

	// NEEDS WORK
	async populateCollection() {
		try {
			const response = await fetch(
				"https://api-biblioteca-mb6w.onrender.com/acervo"
			);
			const data = await response.json();

			this.collection = data.map(
				(item) =>
					new BibliographicEntity(
						item.codigo,
						item.titulo,
						item.autor,
						item.anoPublicacao
					)
			);
			console.log(this.collection);
		} catch (error) {
			console.error("Error:", error);
		}
	}
	// NEEDS WORK
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
