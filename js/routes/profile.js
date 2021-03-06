const utils = require('../utils');
const config = require('../../config');
const axios = require('axios');
const moment = require('moment');

exports.get = async (req, res) => {
  try {
    res.render('profile', {
      'github_client_id': config.github.credentials.client,
      'user': req.session.user,
      'time': utils.formatDateTime(new Date()),
      'joinedDate': `Joined ${moment(new Date(req.session.user.created_at)).format('MMMM')}, ${new Date(req.session.user.created_at).getFullYear()}`,
    });
  } catch (e) {
    console.log(e);
  }
};