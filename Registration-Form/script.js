const element = {
    form: document.querySelector("form"),

    name_input: document.querySelector("#name"),
    email_input: document.querySelector("#email"),
    password_input: document.querySelector("#password"),
    confirm_password_input: document.querySelector("#confirm-password"),

    name_err: document.querySelector("#err-name"),
    email_err: document.querySelector("#err-email"),
    password_err: document.querySelector("#err-password"),
    all_err: document.querySelector("#err-all"),

    success_msg: document.querySelector("#success"),
};

const formState = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
};

function initialize() {
    attachEvent();
}

function attachEvent() {

    element.form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Read the latest input values
        formState.name = element.name_input.value.trim();
        formState.email = element.email_input.value.trim();
        formState.password = element.password_input.value;
        formState.confirm_password = element.confirm_password_input.value;

        verify();
    });
}

function clearErrors() {
    element.name_err.classList.add("hidden");
    element.email_err.classList.add("hidden");
    element.password_err.classList.add("hidden");
    element.all_err.classList.add("hidden");
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
}

function verify() {

    clearErrors();

    if (!formState.name) {
        showError(element.name_err, "Name is required");
        return;
    }

    if (!formState.email) {
        showError(element.email_err, "Email is required");
        return;
    }

    if (!element.email_input.validity.valid) {
        showError(element.email_err, "Enter a valid email");
        return;
    }

    if (!formState.password || !formState.confirm_password) {
        showError(element.password_err, "Password fields are required");
        return;
    }

    if (formState.password.length < 6) {
        showError(
            element.password_err,
            "Password must be at least 6 characters long"
        );
        return;
    }

    if (formState.password !== formState.confirm_password) {
        showError(
            element.password_err,
            "Passwords do not match"
        );
        return;
    }

    element.form.classList.add("hidden");

    element.success_msg.classList.remove("hidden");

    element.success_msg.textContent =
        `Congratulations ${formState.name}, you have registered successfully!`;
}

initialize();