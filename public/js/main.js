

document.getElementById('userForm').addEventListener('submit', function (event) {
    
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    let userData = { name, email };
    

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.json())
});


document.getElementById('getUsers').addEventListener('click', function () {
    fetch('http://localhost:3000/users')

        .then((response) => response.json())
        .then((data) => {
            const userList = data.users;
            let userListElement = document.getElementById('userList');
            userListElement.innerHTML = ''; 

            userList.forEach((user) => {
                let listItem = document.createElement('li');
                listItem.textContent = `${user.name} - ${user.email}`;
                userListElement.appendChild(listItem);
            });
        })

});