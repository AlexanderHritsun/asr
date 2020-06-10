const {body} = require('express-validator/check')

exports.editUserValidators = [
    body('email')
        .isEmail()
        .withMessage('Email невалидный')
        .normalizeEmail(),
    body('password','Минимальная длина пароля 6 символов')
        .isLength({min: 6}),
    body('name').custom(async (value) => {
        try{
            if (!value) {
                return Promise.reject('Никнейм обязательное поле');
            }
            /*const user = await User.findOne({name: value})
            if(user){
                return Promise.reject('Пользователь с таким никнеймом уже существует')
            }*/
        } catch (e) {
            console.log(e)
        }
    })

]