let Validator = require('validatorjs');
const models = require('../../app/database/models')


Validator.registerAsync('unique', async (value, attribute, req, passes) => {
    const args = attribute.split(',')
    // default field is email in this example
    const field = args[0] || 'email';
    const model = args[1]
    const filter = {}
    filter[field] = value

    // do your database/api checks here etc
    const Model = await models[model].findOne({ where: filter });

    if (Model) {
        passes(false, `Then ${field} has already been taken.`); 
    }

    // then call the `passes` method where appropriate:
    passes();
});

const validationEndpointRules = {
    'register': {
        first_name: 'required',
        last_name: 'required',
        email: 'required|email|unique:email,User',
        password: 'required'
    },
    'login': {
        email: 'required|email',
        password: 'required'
    },
}

const validate = (validationEndpoint) => {
    return (req, res, next) => {
        const reqBody = req.body
        const validator = new Validator(reqBody, validationEndpointRules[validationEndpoint]);

        validator.fails(() => {
            let errors = validator.errors['errors']

            return res.status(422).json({
                'success': false,
                errors,
            });
        });

        validator.passes(() => {
            next();
        })
    };
}

module.exports = validate