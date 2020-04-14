const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
try {
  const doc = yaml.safeLoad(fs.readFileSync(`${__dirname}/../../curicculum/seProjects/0.yaml`, 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}