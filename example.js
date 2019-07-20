const compare = require('./')

const data = {
  id: 'foobarbaz',
  name: 'Bazzy',
  contactNumber: '0000000',
  contactIds: ['one', 'two', 'three']
}

const initialValues = {
  id: 'foobarbaz',
  name: 'Bazzy',
  contactIds: ['one', 'two']
}

console.log(compare(data, initialValues))
// { contactNumber: '0000000', contactIds: [ 'three' ] }
