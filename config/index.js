const fileName = process.env.EVN_FILE_NAME || 'local'

const config = {
  client: Object.assign({}, require('./client/common'), require(`./client/${fileName}`)),
}

module.exports = config
