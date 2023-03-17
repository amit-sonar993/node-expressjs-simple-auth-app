const authController = {
    register: (req, res) => {
        const reqBody = req.body
        console.log('req => ', req);
        res.json({reqBody})
    }

} 



module.exports = authController