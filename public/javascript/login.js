
// when signup form button is clicked
async function signupFormHandler(event) {
    event.preventDefault();

    // grab values from form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // check if all fields have values
    if (username && email && password) {
        // POST the signup form info to server
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
           console.log(response); 
        } else {
            alert(response.statusText);
        }
    }
};

// when login form button is clicked
async function loginFormHandler(event){
    event.preventDefault();

    // grab values from form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    // check if all fields have values
    if (email && password) {
        // POST the signup form info to server
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // if login successful redirect to homepage
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

// event listener for Signup form button
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
// event listener for Login form button
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);