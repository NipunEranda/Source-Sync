const utils = require('../utils');
const config = require('../../config');
const github = require('../services/github.service');

exports.get = async (req, res) => {
  try {
    res.render('repositories', {
      'github_client_id': config.github.credentials.client,
      'user': req.session.user,
      'time': utils.formatDateTime(new Date()),
    });
  } catch (e) {
    console.log(e);
  }
};