const {validationResult} = require("express-validator");
const {editUserValidators} = require("../validators");
const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const User = require ('../models/User')


const router = Router();

router.get('/', auth, async (req, res) => {
    try{
        const users = await User.find();
        await res.status(200).json(users)
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.delete('/:id/delete', auth, async (req, res, next) => {
    try{
        User.findByIdAndRemove(req.params.id, (error, data) => {
            if(error){
                return next(error)
            }
            else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    } catch (e) {
        console.log(e)
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        await res.status(200).json(user)
    }
     catch (e) {
         console.log(e)
         await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
     }
})
router.put('/:id/edit', auth, editUserValidators, async (req, res) => {
    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const errorMessages = errors.array().map(el => el.msg)
            console.log(errorMessages)
            return res.status(400).json({
                errors: errors.array(),
                message: errorMessages
            })
        }

        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                console.log(error)
                return next(error);
            } else {
                res.json(data)
                console.log('Student updated successfully !')
            }
        })
    }
     catch (e) {
         console.log(e)
         await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
     }
})

module.exports = router;