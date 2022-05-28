const utils = require('../utils');
const config = require('../../config');
const github = require('../services/github');

exports.get = async (req, res) => {
  try {
    const repositories = await github.getRepositories(req.query.org);
    res.render('repositories', {
      'github_client_id': config.github.credentials.client,
      'user': req.session.user,
      'time': utils.formatDateTime(new Date()),
      'repositories': repositories,
      'repositories_json': JSON.stringify(repositories),
    });
  } catch (e) {
    console.log(e);
  }
};