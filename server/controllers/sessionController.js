const sessionController = {};

sessionController.createSession = (req, res, next) => {
  if (!req.session.userInfo) {
    req.session.userInfo = {
      email: res.locals.userInfo.email,
      username: res.locals.userInfo.username,
    };
  };
  console.log(req.session.userInfo)

  return next();
}

sessionController.logOut = (req, res, next) => {
    const userId = 'userID';
    //kill the node-session 
    req.session.destroy();
    //kill the cookie
    res.clearCookie(userId);
    res.redirect('/');
}

sessionController.getCurrentUser = async (req, res, next) => {
  const { userInfo } = req.session;

  if (!userInfo) {
    return next({ log: 'error at getCurrentUser middleware', message: 'No user found in session'});
  }

  res.locals.currentUser = userInfo;
  return next();
}

module.exports = sessionController;