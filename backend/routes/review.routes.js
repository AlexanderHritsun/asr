const {Router} = require('express')
const router = Router();
const Review = require('../models/Review')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')

router.post('/create', auth,
    check('text')
        .custom( value => {
            if(!value){
                return Promise.reject('Отзыв не может быть пустым')
            }
            return true
        }),
    check('rating')
        .custom( value => {
            if(!value){
                return Promise.reject('Поставьте свою оценку')
            }
            return true
        }),
    )

module.exports = router