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
const request = require('request')



const fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, 'utf8', function(error, data) {
      if (error) {
        reject(error, null)
      } else {
        let firstLine = data.split('\n')[0];
        resolve(firstLine);
      }
    });
  }).then(value => {
    return new Promise((resolve, reject) => {
      var options = {
        url: 'https://api.github.com/users/' + value,
        headers: { 'User-Agent': 'request' },
        json: true // will JSON.parse(body) for us
      };
      request.get(options, function(err, res, body) {
        if (err) {
          reject(err, null);
        } else if (body.message) {
          console.log('body message: ', body.message)
          reject(new Error('Failed to get GitHub profile: ' + body.message), null);
        } else {
          resolve(body);
        }
      });
    });
  }).then(value => {
    return new Promise((resolve, reject) => {
      fs.writeFile(writeFilePath, JSON.stringify(value), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    })
  })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
