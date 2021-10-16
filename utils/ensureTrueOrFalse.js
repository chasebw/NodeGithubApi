const ensureTrueOrFalse = (boolAsString) => {

    if (boolAsString === 'true') {
        return true;
    } else if (boolAsString === 'false') {
        return false;
    } else {
        return null;
    }
} 

module.exports = ensureTrueOrFalse;