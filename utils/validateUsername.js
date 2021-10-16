const validateUsername = function(username) {
    if (validate_alphanumeric_underscore_hyphens(username)) {
        return username;
    } else {
        return "Invalid Username";
    }
}

function validate_alphanumeric_underscore_hyphens(str) 
{
    return str.match('^[a-zA-Z0-9_\-]+$');
}

module.exports = validateUsername;