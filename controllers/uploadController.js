const parseCSV = require('../utils/csvParser');
const db = require('../db');
const { csvPath } = require('../config/env');

const uploadCSV = async (req, res) => {
  try {
    const users = parseCSV(csvPath);

    const ageGroups = { lt20: 0, bt20_40: 0, bt40_60: 0, gt60: 0 };

    for (const user of users) {
      const { name, age, ...rest } = user;

      const fullName = `${name.firstName} ${name.lastName}`.trim();
      const ageNum = parseInt(age);
      const address = rest.address || null;

      delete rest.name;
      delete rest.address;

      const additionalInfo = Object.keys(rest).length ? rest : null;

      await db.query(
        `INSERT INTO users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)`,
        [fullName, ageNum, address, additionalInfo]
      );

      // Age Group Count
      if (ageNum < 20) ageGroups.lt20++;
      else if (ageNum <= 40) ageGroups.bt20_40++;
      else if (ageNum <= 60) ageGroups.bt40_60++;
      else ageGroups.gt60++;
    }

    const total = users.length;
    console.log('Age-Group % Distribution:');
    console.log(`< 20:\t\t${((ageGroups.lt20 / total) * 100).toFixed(2)}%`);
    console.log(`20 – 40:\t${((ageGroups.bt20_40 / total) * 100).toFixed(2)}%`);
    console.log(`40 – 60:\t${((ageGroups.bt40_60 / total) * 100).toFixed(2)}%`);
    console.log(`> 60:\t\t${((ageGroups.gt60 / total) * 100).toFixed(2)}%`);

    res.status(200).json({ message: 'Upload and processing complete.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process CSV' });
  }
};

module.exports = { uploadCSV };
