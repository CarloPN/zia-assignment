

const path = require('path');
const fs = require('fs-extra');

async function readFsFileContent() {
    try {
      const filePath = path.join(__dirname, 'placeholder-data-test.js'); // Adjust the file path
      const fileContent = await fs.readFile(filePath, 'utf8');
      return fileContent;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }
  
  module.exports = readFsFileContent;
