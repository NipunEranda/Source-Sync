const utils = require('../utils');
const config = require('../../config');

exports.get = async (req, res) => {
  try {
    res.render('settings', {
      'github_client_id': config.github.credentials.client,
      'user': req.session.user,
      'time': utils.formatDateTime(new Date()),
    });
  } catch (e) {
    console.log(e);
  }
};

exports.save = async (req, res) => {
  try{
    console.log(req.body);
    req.flash('success_messages', 'Settings Saved!');
    res.sendStatus(200);
  }catch(e){
    req.flash('error_messages', e.message);
    res.sendStatus(500);
  }
}