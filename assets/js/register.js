document.addEventListener('DOMContentLoaded', function() {
    var registerButton = document.getElementById('registerButton');
    var registerButtonClicked = false;

    registerButton.addEventListener('click', function() {
        registerButtonClicked = true;
        if (validateForm()) {
            // If the form is valid, redirect to tasks.html
            window.location.href = 'tasks.html';
        }
    });

    // Add event listeners for each input field to validate as the user types
    var formFields = document.querySelectorAll('#registerForm input, #registerForm select');
    formFields.forEach(function(field) {
        field.addEventListener('input', function() {
            validateField(field, registerButtonClicked);
        });
    });
});

function validateForm() {
    var formFields = document.querySelectorAll('#registerForm input, #registerForm select');
    var isValid = true;

    formFields.forEach(function(field) {
        isValid = validateField(field, true) && isValid;
    });

    return isValid;
}

function validateField(field, validateEmail) {
    var fieldValue = field.value.trim();
    var errorMessage = '';

    if (field.hasAttribute('required') && fieldValue === '') {
        errorMessage = 'This field is required.';
    } else if (field.id === 'gender' && fieldValue === '') {
        errorMessage = 'Please select your gender.';
    } else if (field.id === 'email' && validateEmail && !isValidEmail(fieldValue)) {
        errorMessage = 'Please enter a valid email address.';
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

function isValidEmail(email) {
    // Simplified email validation using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
