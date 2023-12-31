const { registerChangePasswordPage } = require('./pages/change-password')
const { registerEditUserPage } = require('./pages/edit-user')
const { registerHomePage } = require('./pages/home')
const { registerLoginPage } = require('./pages/login')
const { registerLogoutPage } = require('./pages/logout')
const { registerUsersPage } = require('./pages/users')
const { registerAddUserPage } = require('./pages/add-user')
const { registerDeleteUserPage } = require('./pages/delete-user')

module.exports = {
  registerPageRoutes: function registerPageRoutes (app) {
    registerHomePage(app)
    registerChangePasswordPage(app)
    registerEditUserPage(app)
    registerLoginPage(app)
    registerLogoutPage(app)
    registerUsersPage(app)
    registerAddUserPage(app)
    registerDeleteUserPage(app)
  }
}
