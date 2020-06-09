const {Router} = require('express')
const router = Router();
const Comment = require('../models/Comment')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')

router.post('/create', auth,
    check('text')
        .custom( value => {
            if(!value){
                return Promise.reject('Комментарий не может быть пустым')
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

            const comment = new Comment({
                text: req.body.text,
                userId: req.user,
            })
            try{
                await comment.save();
                await res.status(201).json({ comment });

            } catch (e) {
                console.log(e)
                await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
        }
    )

router.delete('/:id/delete', auth, async (req, res, next) => {
    try{
        await Comment.findByIdAndRemove(req.params.id,(error, data) => {
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