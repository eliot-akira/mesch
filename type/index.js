import schema from '../base'

const type = {

  required: value => (typeof value==='undefined' || value==='')
    ? schema.error.required
    : null
  ,

  string: value => schema.type.required(value) || (
    typeof value!=='string'
      ? schema.error.invalid
      : null
  ),

  object: (shape = {}) => value => schema.type.required(value) || (
    typeof value!=='object'
      ? schema.error.invalid
      : Object.keys(shape).reduce((errors, key) => {
        const error = shape[key](value[key])
        if (error) {
          if (!errors) errors = {}
          errors[key] = error
        }
        return errors
      }, null)
  ),

  email: require('./email'),
}

export default type