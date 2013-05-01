var cons = require('consolidate');
exports.index = function(req, res){
	res.render('index.html', { title: 'Cross Canvas' });
};