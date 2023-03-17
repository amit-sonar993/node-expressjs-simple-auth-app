let Validator = require('validatorjs');

let data = {
    name: 'John',
    email: 'johndoe@gmail.com',
    age: 28
};

let rules = {
    name: 'required',
    email: 'required|email',
    age: 'min:18'
};

const validationEndpointRules = {
    'register': {
        name: 'required',
        email: 'required|email',
        password: 'required'
    }
}

const validate = (validationEndpoint) => {
    return (req, res, next) => {
        console.log(req);
        const reqBody = req.body
        console.log('reqBody', reqBody);
        const validation = new Validator(reqBody, validationEndpointRules[validationEndpoint]);

        if (validation.fails()) {
            let errors = validation.errors['errors']

            return res.json({
                'success': false,
                errors,
            });
        }


        next();
    };
}




module.exports = validate