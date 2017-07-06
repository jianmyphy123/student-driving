/**
 * GET /school
 * List all school.
 */
const School = require('../models/School.js');
const fs = require('fs');

exports.getSchool = (req, res) => {
  var content = fs.readFileSync('./video_rating.json');
  var videID = JSON.parse(content);
    School.find((err, docs) => {
        res.render('school', { school: docs, video: videID });
    });
};