
const schema = require('./base')

schema.error = require('./error')
schema.type = require('./type')

// Returns null if valid, or object of keys with errors
schema.validate = (value, shape) =>
  shape instanceof Function
    ? (shape(value) || null)
    : schema.type.object(shape)(value)

// Retuns true if valid
schema.valid = (value, shape) => schema.validate(value, shape)===null

export default schema
