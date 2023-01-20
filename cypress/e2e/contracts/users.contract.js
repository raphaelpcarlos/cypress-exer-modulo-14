const Joi =  require('joi')

const usersSchema = Joi.object({
  quantidade: Joi.number(),
  usuarios: Joi.array().items({
    administrador: Joi.string(),
    email: Joi.string(),
    nome: Joi.string(),
    password: Joi.string(),
    _id: Joi.string(),
  })
})

export default usersSchema;