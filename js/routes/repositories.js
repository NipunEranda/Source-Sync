const utils = require('../utils');
const config = require('../../config');
const github = require('../services/github.service');

exports.get = async (req, res) => {
  try {
    const repositories = await github.getPersonalRepositories(req.query.org);
    await Promise.all(repositories.map(async (repository, i) => {
      const l = await github.getLanguagesInRepository(repository.languages_url);
      repositories[i].languages = l;
    }));
    res.render('repositories', {
      'github_client_id': config.github.credentials.client,
      'user': req.session.user,
      'user_json': JSON.stringify(req.session.user),
      'repositories': JSON.stringify(repositories),
      'time': utils.formatDateTime(new Date()),
    });
  } catch (e) {
    console.log(e);
  }
};