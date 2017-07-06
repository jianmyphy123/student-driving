/**
 * GET /lesson
 * List all lesson.
 */
const Lesson = require('../models/School.js');
const fs = require('fs');

exports.getLesson = (req, res) => {
  var content = fs.readFileSync('./video_rating.json');
  var videID = JSON.parse(content);
  Lesson.find((err, docs) => {
    res.render('lesson', { lesson : docs, video : videID });
  });
};

exports.changeRating = (req, res) => {
  var content = fs.readFileSync('./video_rating.json');
  var videos = JSON.parse(content);
  var newVideos = {};
  var vId = req.body.videoId;
  var vRating = parseFloat(req.body.rating);
  for (var val in videos) {
    var newVideoId = videos[ val ].id;
    var newVideoRating = videos[ val ].rating;
    var newUserCount = videos[ val ].user_count;
    if (newVideoId === vId) {
      newVideoRating = parseFloat((((newVideoRating * newUserCount) + vRating) / (newUserCount + 1)).toFixed(2));
      newUserCount++;
    }
    newVideos[ val ] = {
      id         : newVideoId,
      rating     : newVideoRating,
      user_count : newUserCount
    };
  }
  fs.writeFile('./video_rating.json', JSON.stringify(newVideos), 'utf8');
  res.send(newVideos);
};
