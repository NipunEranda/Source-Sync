exports.log = function (message) {
    console.log(new Date().toISOString() + ' ' + message);
};

// format a date time
exports.formatDateTime = function (d) {
    return d.toISOString();
};