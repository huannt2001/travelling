const form = document.getElementById('form')
const username = document.getElementById('username')
const phonenumber = document.getElementById('phonenumber')
const address = document.getElementById('address')
const email = document.getElementById('email')
const quatity = document.getElementById('quatity')

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
    const small = formControl.querySelector('small')
    small.innerText = ''
}

// Check email is valid
function checkEmail(input) {
    let isValid = false;

    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (re.test(input.value.trim())) {
        showSuccess(input)
        isValid = true;
    } else {
        showError(input, 'Email is not valid')
    }
    return isValid;
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
            isRequired = true
        } else {
            showSuccess(input)
        }
    })

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    let isValid = false;
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        )
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        )
    } else {
        showSuccess(input)
        isValid = true;
    }
    return isValid;
}

// Check input quatity
function checkQuatity(input, min, max) {
    let isValid = false;
    if (input.value < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min}`
        )
    } else if (input.value > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max}`
        )
    } else {
        showSuccess(input)
        isValid = true;

    }
    return isValid;
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault()


    if (!checkRequired([username, phonenumber, email, quatity])) {
        const isUser = checkLength(username, 3, 15)
        const isPhone = checkLength(phonenumber, 11, 11)
        const isQuatity = checkQuatity(quatity, 1, 10)
        const isEmail = checkEmail(email)

        if (isUser && isPhone && isQuatity & isEmail) {
            let obj = {};
            obj.name = username.value;
            obj.phone = phonenumber.value;
            obj.email = email.value;
            obj.quatity = quatity.value;
            obj = JSON.stringify(obj);
            console.log(obj)
            alert(obj)
        }
    }
})