const utils = require('../utils');
const config = require('../../config');

exports.get = async (req, res) => {
  try {
    res.render('homepage', {
      'github_client_id': config.github.credentials.client,
      //'user': req.session.name.split(' ')[0],
      'time': utils.formatDateTime(new Date()),
    });
  } catch (e) {
    console.log(e);
  }
};