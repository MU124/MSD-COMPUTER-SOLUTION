/**
 * Session Authentication Guard for Admin Panel
 */
function requireAdminAuth(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  }
  return res.redirect('/admin/login');
}

/**
 * Guest middleware: redirect logged-in admins away from login page
 */
function requireGuest(req, res, next) {
  if (req.session && req.session.admin) {
    return res.redirect('/admin/dashboard');
  }
  return next();
}

module.exports = {
  requireAdminAuth,
  requireGuest
};
