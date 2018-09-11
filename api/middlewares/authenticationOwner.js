module.exports = (req,res,next) => {
	if(req.mainObj && (req.mainObj._user == req.user.id)) return next();

	// next(new Error('you have no permisions to be here'));
	res.json({
		message: 'you have no permisions to be here'
	})
	return
}