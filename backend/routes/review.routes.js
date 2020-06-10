const {Router} = require('express')
const router = Router();
const Review = require('../models/Review')
const Service = require('../models/Service')
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
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const errorMessages = errors.array().map(el => el.msg)
            console.log(errorMessages)
            return res.status(400).json({
                errors: errors.array(),
                message: errorMessages
            })
        }

        const review = new Review({
            text: req.body.text,
            rating: req.body.rating,
            userId: req.user.userId,
        })
        const service = await Service.findById(req.body.serviceId);
        service.reviews.push(review._id);
        try{
            await review.save();
            await service.save();
            await res.status(201).json({ review });

        } catch (e) {
            console.log(e)
            await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.delete('/:id/delete', auth, async (req, res, next) => {
    try{
        await Review.findByIdAndRemove(req.params.id,(error, data) => {
            if(error){
                return next(error)
            }
            else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    }
    catch (e) {
        console.log(e)
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router