const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const scheme = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
    }

    const validate = v.validate(req.body, scheme);
    if(validate.length){
        return res.status(400).json({
            status: 'error say',
            message: validate
        });
    };

    const user = await User.findOne({
        where: { email: req.body.email}
    });

    if(user){
        return res.status(409).json({
            status: 'error',
            message: 'email already exist!'
        })
    };

    const password = await bcrypt.hash(req.body.password, 10);

    const data = {
        password, 
        name: req.body.name,
        email: req.body.email,
        role: 'user'
    };

    const createdUser = await User.create(data);

    return res.json({
        status: 'success',
        data: {
            id: createdUser.id
        }
    });
}