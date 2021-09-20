const ECDSA = require('ecdsa-secp256r1');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const privateKey = ECDSA.generateKey();
const privatePem = privateKey.toPEM();
const publicPem = privateKey.asPublic().toPEM();

const template = `module.exports = {
  PRIVATE: \`${privatePem}\`,
  PUBLIC: \`${publicPem}\`,
};`;

const configDir = path.join(__dirname, '..', 'config');

mkdirp.sync(configDir);

fs.writeFileSync(configDir + '/certs.config.js', template);
