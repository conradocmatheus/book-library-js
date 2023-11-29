class Library {
	constructor() {
		this.users = [];
		this.collection = [];
		this.populateUsers();
	}

	// DONE FOR NOW
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
	// DONE FOR NOW

	// NEED TO WORK ON THIS
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
	// NEED TO WORK ON THIS

	// NEED TO WORK ON THIS, ESPECIALLY THE DATE PART
	addUser() {
		let userFirstNameInput = document.getElementById("inputFirstName");
		let userLastNameInput = document.getElementById("inputLastName");
		let userAcademicRegisterInput = document.getElementById("inputAR");
		let userBirthDateInput = document.getElementById("inputBdate");

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
	}
	// NEED TO WORK ON THIS, ESPECIALLY THE DATE PART
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
