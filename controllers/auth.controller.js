const AuthModel = require('../models/auth.model');
const am = new AuthModel();

class AuthController {
  loginUser(loginCredentials) {
    return am.login(loginCredentials);
  }
  registerUser(registerCredentials) {
    return am.register(registerCredentials);
  }

  logoutUser() {
    return am.logout();
  }
}

module.exports = AuthController;
