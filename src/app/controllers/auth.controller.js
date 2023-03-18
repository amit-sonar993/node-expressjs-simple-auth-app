const httpStatus = require('http-status');
const { User } = require('../database/models')
const bcrypt = require('bcrypt');
const authTokenService = require('../../services/tokenService')

const authController = {
    register: async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body
            const data = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
            }

            const user = await User.create(data);

            res.status(httpStatus.CREATED).send({ user });
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).json({ error })
            console.error('Unable to create user:', error);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ where: { email } });

            if (!user) {
              return res.status(401).json({ error: 'Invalid email or password' });
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
              return res.status(401).json({ error: 'Invalid email or password' });
            }

            let token = await authTokenService.generateToken(user)

            res.json({
                success: true,
                data: token
            });
        } catch (error) {
            res.json({ error })
            console.error('Unable to create user:', error);
        }
    },

}



module.exports = authController