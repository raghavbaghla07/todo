const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName)
        throw new Error("First name and last name are required")
    if (!emailId || !validator.isEmail(emailId))
        throw new Error("Email is not valid")
    if (!password || !validator.isStrongPassword(password))
        throw new Error("Choose a strong password")
}

const validateEditTodoData = (req) => {
    const allowedEditFields = [
        "title",
        "description",
        "completed"
    ];

    if (Object.keys(req.body).length === 0)
        return false;
    const isEditAllowed = Object.keys(req.body).every(field =>
        allowedEditFields.includes(field));

    return isEditAllowed;

}
module.exports = {
    validateSignUpData, validateEditTodoData
}