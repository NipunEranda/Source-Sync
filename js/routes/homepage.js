const utils = require('../utils');
const config = require('../../config');
const axios = require('axios');

exports.get = async (req, res) => {
  try {
    res.render('homepage', {
      'github_client_id': config.github.credentials.client,
      //'user': await getUserData(req, res),
      'time': utils.formatDateTime(new Date()),
    });
  } catch (e) {
    console.log(e);
  }
};