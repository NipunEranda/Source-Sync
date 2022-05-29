const utils = require('../utils');
const config = require('../../config');
const github = require('../services/github.service');

exports.get = async (req, res) => {
  try {
    const organizations = await github.getOrganizations(req, res);
    res.render('organizations', {
      'github_client_id': config.github.credentials.client,
      'user': req.session.user,
      'time': utils.formatDateTime(new Date()),
      'organizations': organizations,
      'organizations_json': JSON.stringify(organizations),
    });
  } catch (e) {
    console.log(e);
  }
};