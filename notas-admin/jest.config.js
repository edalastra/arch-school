// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  testMatch: ['<rootDir>/tests/**/*.test.ts']
};

module.exports = config;

// Or async function
module.exports = async () => {
  return {
    verbose: true,
    testMatch: ['<rootDir>/tests/**/*.test.ts']
  };
};