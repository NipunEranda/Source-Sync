const utils = require('../utils');
const config = require('../../config');
const github = require('../services/github.service');

exports.get = async (req, res) => {
  try {
    const repositories = await github.getRepositories(req.query.org);
    for (let repository in repositories) {
      const l = await github.getLanguagesInRepository(repositories[repository].languages_url);
      repositories[repository].languages = l;
    };
    //req.flash('error_messages', 'Repositories Retrieved!');
    res.render('organization-repositories', {
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