const Joi = require("joi")


module.exports={
    addNoteSchema:{
        body:Joi.object().required().keys({
            title:Joi.string().required(),
            message_body:Joi.string().required(),
            type:Joi.string().required(),
            status:Joi.string().required(),
        }),
        files:Joi.object().required(),
    },
}
