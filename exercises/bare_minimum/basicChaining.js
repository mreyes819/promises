/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

const fs = require('fs');
const Promise = require('bluebird');
const request = require('request');
const pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
const getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;


const fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(getGitHubProfileAsync)
    .then(value => {
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, JSON.stringify(value), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
