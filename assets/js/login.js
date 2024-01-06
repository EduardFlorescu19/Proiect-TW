document.addEventListener('DOMContentLoaded', function() {
    var loginButton = document.getElementById('loginButton');
    var loginButtonClicked = false;

    loginButton.addEventListener('click', function() {
        loginButtonClicked = true;
        if (validateForm()) {
            // If the form is valid, redirect to tasks.html
            window.location.href = 'tasks.html';
        }
    });

    // Add event listeners for each input field to validate as the user types
    var formFields = document.querySelectorAll('#loginForm input');
    formFields.forEach(function(field) {
        field.addEventListener('input', function() {
            validateField(field, loginButtonClicked);
        });
    });
});

function validateForm() {
    var formFields = document.querySelectorAll('#loginForm input');
    var isValid = true;

    formFields.forEach(function(field) {
        isValid = validateField(field, true) && isValid;
    });

    return isValid;
}

function validateField(field, validatePassword) {
    var fieldValue = field.value.trim();
    var errorMessage = '';

    if (field.hasAttribute('required') && fieldValue === '') {
        errorMessage = 'This field is required.';
    } else if (field.id === 'password' && validatePassword && fieldValue.length < 6) {
        errorMessage = 'Password must be at least 6 characters long.';
    }

    // Check if an error message is already displayed for the field
    var existingErrorContainer = document.getElementById(field.id + '-error');
    if (existingErrorContainer) {
        // Remove the existing error message
        existingErrorContainer.remove();
    }

    displayErrorMessage(field, errorMessage);

    return errorMessage === '';
}

function displayErrorMessage(field, message) {
    // Check if an error message is already displayed for the field
    var existingErrorContainer = document.getElementById(field.id + '-error');

    // If an error message exists, update its content
    if (existingErrorContainer) {
        existingErrorContainer.textContent = message;

        // If the message is empty, hide the error container
        if (!message) {
            existingErrorContainer.style.display = 'none';
        } else {
            existingErrorContainer.style.display = 'block';
        }
    } else {
        // If no error message exists, create a new one
        var errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.id = field.id + '-error';

        // Append error message below the field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
}
