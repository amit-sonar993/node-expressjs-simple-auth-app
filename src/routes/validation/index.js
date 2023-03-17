let Validator = require('validatorjs');

const validationEndpointRules = {
    'register': {
        first_name: 'required',
        last_name: 'required',
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