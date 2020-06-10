const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post('/registration',
    [
        check('email', 'Email невалидный').isEmail(),

        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6}),

        check('repeat_password')
            .custom((value, {req}) => {
                if(value !== req.body.password) {
                    throw new Error('Пароли не совпадают')
                }
                return true
            }),

        check('name')
            .custom(async (value) => {
                try{
                    if (!value) {
                        return Promise.reject('Никнейм обязательное поле');
                    }
                    const user = await User.findOne({name: value})
                    if(user){
                        return Promise.reject('Пользователь с таким никнеймом уже существует')
                    }
                } catch (e) {
                    console.log(e)
                }
            })
    ]
    , async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const errorMessages = errors.array().map(el => el.msg)
            console.log(errorMessages)
            return res.status(400).json({
                errors: errors.array(),
                message: errorMessages
            })
        }

        const {email, password, name} = req.body;

        const candidate = await User.findOne({email});

        if(candidate) {
            return await res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 15);
        const user = new User({email, name, password: hashedPassword});
        await user.save();

        await res.status(201).json({message: 'Пользователь успешно создан'});


    } catch (e) {
        await res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

router.post('/login',
    [
        check('email', 'Введите корректный email')
            .normalizeEmail().isEmail(),
        check('password', 'Введите пароль')
            .exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const errorMessages = errors.array().map(el => el.msg)
            return res.status(400).json({
                errors: errors.array(),
                message: errorMessages
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return await res.status(400).json({message: 'Юзер не найден'})
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: 'Не верный пароль или email'});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        await res.json({token, userId: user.id, userRole: user.role})



    } catch (e) {
        await res.status(500).json({ message: 'Что-то пошло не так...'})
    }
})

module.exports = router