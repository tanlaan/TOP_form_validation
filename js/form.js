// Get Form
const form = document.getElementsByTagName('form')[0];

// Get all inputs
const formElements = document.getElementsByTagName('input');

const errorElements = document.getElementsByClassName('error')

// Get inputs
// const email = document.getElementById('email');
// const country = document.getElementById('country');
// const zip = document.getElementById('zip');
// const pass = document.getElementById('pass');
// const passConf = docment.getElementById('passConf');

// Error spans
const emailErrorSpan = document.querySelector('#email + span.error');
const countryErrorSpan = document.querySelector('#country + span.error');
const zipErrorSpan = document.querySelector('#zip + span.error');
const passErrorSpan = document.querySelector('#pass + span.error');
const passConfErrorSpan = document.querySelector('#passConf + span.error');


// Error Event listeners
for (let input of formElements) {
    if (input.name === 'passConf') {
        const pass = document.getElementById('pass')
        input.addEventListener('input', function (event) {
            const element = event.currentTarget
            const error = element.parentNode.getElementsByClassName('error')[0]
            if (element.validity.valid) {
                error.innerHTML = '';
                error.className = 'error';
                if (pass.value !== element.value) {
                    element.setCustomValidity('Value needs to equal password.')
                    error.textContent = 'Value needs to equal password.'
                }
            } else {
                element.setCustomValidity('')
                showError(element)
            };
        });
    } else {
        input.addEventListener('input', function (event) {
            const element = event.currentTarget
            const error = element.parentNode.getElementsByClassName('error')[0]
            if (element.validity.valid) {
                error.innerHTML = '';
                error.className = 'error';
            } else {
                showError(element)
            };
        });
    };
};

function emailError(email) {
    if (email.validity.valueMissing) {
        emailErrorSpan.textContent = "You need an email address."
    } else if (email.validity.typeMismatch){
        emailErrorSpan.textContent = "Value needs to be a valid email address."
    } else if (email.validity.tooShort) {
        emailErrorSpan.textContent = "An email couldn't be this short."
    }
}

function countryError(country) {
    if (country.validity.typeMismatch) {
        countryErrorSpan.textContent = "Value needs to be a valid Country."
    } else if (country.validity.tooShort) {
        countryErrorSpan.textContent = "Country name can't be this short."
    }
}

function zipError(zip) {
    if (zip.validity.typeMismatch) {
        zipErrorSpan.textContent = "Value needs to be a valid Zip Code."
    } else if (zip.validity.tooShort) {
        zipErrorSpan.textContent = "Zip codes can't be this short."
    } else if (zip.validity.tooLong) {
        zipErrorSpan.textContent = "Too long to be a zip code."
    }
}

function passError(pass) {

}zipErrorSpan.textContent = ""

function passConfError(passConf) {

}

function showError(inputElement) {
    switch (inputElement.name) {
        case 'email':
            emailError(inputElement);
            break;
        case 'country':
            countryError(inputElement);
            break;  
        case 'zip':
            zipError(inputElement);
            break;   
        case 'pass':
            passError(inputElement);
            break;     
         case 'passConf':
            passConfError(inputElement);
            break;  
        default: alert('Something went wrong with showError() -> inputElement.')
    };
};

form.addEventListener('submit', function (event) {
    let canSubmit = true;
    for (let inputElement of formElements) {
        if (!inputElement.validity.valid) {
            canSubmit = false;
            showError(inputElement);
        };
    };
    if (!canSubmit) {
        event.preventDefault();
        alert('Error: Incorrect user input detected, try again.');
    };
});