const bcrypt = require('bcrypt');
const {User} = require('../../../models')
const Validator = require('fastest-validator');

const v = new Validator();

module.exports = async (req, res) => {
    const scheme = {
        email : 'email|empty:false',
        password : 'string|min:6'
    }
    
    const validate = v.validate(req.body, scheme);
    if(validate.length){
        return res.status(400).json({
            status: 'error bos',
            message: validate
        });
    }

    const user = await User.findOne({
        where: { email: req.body.email }
    });

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    
    if(!isValidPassword){
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        });
    }

    res.json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        }
    })
}
