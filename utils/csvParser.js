const fs = require('fs');

function setNested(obj, keys, value) {
  let temp = obj;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      temp[key] = value;
    } else {
      if (!temp[key]) temp[key] = {};
      temp = temp[key];
    }
  });
}

function parseCSV(filePath) {
  const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
  const headers = data[0].split(',').map(h => h.trim());

  return data.slice(1).map(line => {
    const values = line.split(',').map(val => val.trim());
    const obj = {};
    headers.forEach((header, i) => {
      const keys = header.split('.');
      setNested(obj, keys, values[i]);
    });
    return obj;
  });
}

module.exports = parseCSV;
