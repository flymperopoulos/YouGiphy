// exports method that returns the next method and redirects to '/'
module.exports = function ensureAuthenticated(req, res, next) {
	console.log(req.user);
	if (req.isAuthenticated()) { return next(); }
		res.status(500).json({failedAuthMessage: 'You are not authenticated!'})
}