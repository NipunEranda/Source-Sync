const utils = require('../utils');
const config = require('../../config');
const axios = require('axios');

exports.get = async (req, res) => {
  try {
    res.render('profile', {
      'github_client_id': config.github.credentials.client,
      'user': req.session.user,
      'userTest': JSON.stringify(req.session.user),
      'time': utils.formatDateTime(new Date()),
    });
  } catch (e) {
    console.log(e);
  }
};