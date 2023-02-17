let urlAPP = 'http://www.raydelto.org/agenda.php';
const buttton = document.getElementById('btn-data');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const userphone = document.getElementById('userphone');

//* Disabling form submissions if there are invalid fields
disableForm = () => {
	'use strict';

	const forms = document.querySelectorAll('.needs-validation');

	//* Loop over them and prevent submission
	Array.from(forms).forEach((form) => {
		form.addEventListener(
			'submit',
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add('was-validated');
			},
			false
		);
	});
};

//* API connection
fetch(urlAPP).then((response) =>
	response
		.json()
		.then((data) => showData(data))
		.then((response) => console.log('Éxito: ', response))
		.catch((error) => console.error('Error: ', error))
);

//* Show API data
const showData = (data) => {
	console.log(data);

	let body = '';

	for (let i = 0; i < data.length; i++) {
		body += `<tr>
		<td>${data[i].nombre}</td>
		<td>${data[i].apellido}</td>
		<td>${data[i].telefono}</td>
		</tr>`;
	}

	document.getElementById('infoUser').innerHTML = body;
};

//* Send data to the API
buttton.addEventListener('click', () => {
	setDataPost();
});

setDataPost = () => {
	const objet = {
		nombre: firstName.value,
		apellido: lastName.value,
		telefono: userphone.value,
	};

	fetch(urlAPP, {
		method: 'POST',
		body: JSON.stringify(objet),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((response) => console.log('Éxito: ', response))
		.catch((error) => console.error('Error: ', error));
};
