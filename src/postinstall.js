const fs = require('fs');

fs.copyFile('.env.dist', '.env', (err) => {
  if (err) throw err;

  console.log('Environment file copied successfully');
});
