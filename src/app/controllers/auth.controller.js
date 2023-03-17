const {User} = require('../database/models')

const authController = {
    register: async (req, res) => {
        try {
            const {first_name, last_name, email, password} = req.body
            const data = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
            }

            const user = await User.create(data);

            res.json({ user })
        } catch (error) {
            res.json({ error })
            console.error('Unable to create user:', error);
        }
    }

}



module.exports = authController