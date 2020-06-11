const getUniqueErrorMessage = (err) => {
    let output;
    try {
        let errorMessage = err.message;

        let fieldName = errorMessage.match(/"/).index;

        let newString = errorMessage.slice(fieldName + 1, errorMessage.length - 3);

        output = newString + " already exist please user another one!";
    } catch (e) {
        output = "Unique field already exists";
    }
        return output;
    };

const getErrorMessage = (err) => {
    let message = "";

    if (err.code) {
        switch (err.code) {
        case 11000:
        case 11001:
            message = getUniqueErrorMessage(err);
            break;
        default:
            message = "something went wrong";
        }
    } else if (err.message) {
        return err.message;
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message) {
            message = err.errors[errName].message;
        }
    }
    }
    return message;
};

module.exports = getErrorMessage;