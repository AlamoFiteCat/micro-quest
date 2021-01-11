module.exports = (type, error) => {
  // [Login Errors]
  if (type === 'login') {
    switch (error.code) {
      case 'auth/invalid-email':
        return { code: 400, message: 'The email address is not valid!' };
      case 'auth/user-disabled':
        return {
          code: 401,
          message:
            'The user corresponding to the given email has been disabled!',
        };
      case 'auth/user-not-found':
        return {
          code: 404,
          message: 'There is no user corresponding to the given email!',
        };
      case 'auth/wrong-password':
        return {
          code: 400,
          message:
            'The password is invalid for the given email, or the account corresponding to the email does not have a password set!',
        };
      default:
        return {
          code: 418,
          message: `We couldn't log you at the moment. Please try again later!`,
        };
    }
  }
  // [Register Errors]
  if (type === 'register') {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return {
          code: 403,
          message: 'An account with the given email address already exists!',
        };
      case 'auth/invalid-email':
        return { code: 400, message: 'The email address is not valid!' };
      case 'auth/operation-not-allowed':
        return {
          code: 403,
          message: 'Email/Password accounts are currently disabled!',
        };
      case 'auth/weak-password':
        return { code: 400, messsage: 'The password is not strong enough!' };
      default:
        return {
          code: 418,
          message: `We couldn't create your account at the moment. Please try again later!`,
        };
    }
  }
  // [Firestore Errors]
  if (type === 'firestore') {
    switch (error.code) {
      case 'cancelled':
        return { code: 408, message: 'The operation was cancelled' };
      case 'unknown':
        return { code: 418, message: 'Unknown error. Please try again later!' };
      case 'invalid-argument':
        return {
          code: 400,
          message:
            'You have specified an invalid argument. Please check your input!',
        };
      case 'deadline-exceeded':
        return {
          code: 408,
          message: 'Deadline expired before operation could complete!',
        };
      case 'not-found':
        return { code: 404, message: 'Requested document was not found!' };
      case 'already-exists':
        return { code: 400, message: 'Document already exists!' };
      case 'permission-denied':
        return {
          code: 401,
          message:
            'You do not have the required permission to execute the specified operation!',
        };
      case 'resource-exhausted':
        return {
          code: 410,
          message: 'Resources exhausted. Please contact user support!',
        };
      case 'failed-precondition':
        return {
          code: 412,
          message:
            'Operation was rejected because the system is not in a state required for the operation execution. Please contact user support!',
        };
      case 'aborted':
        return {
          code: 408,
          message: 'Operaton was aborted. Please try again later!',
        };
      case 'out-of-range':
        return {
          code: 400,
          message:
            'Operation was attempted past the valid range. Please contact user support!',
        };
      case 'unimplemented':
        return {
          code: 501,
          message: 'Operation is not implemented or not supported/enabled!',
        };
      case 'internal':
        return {
          code: 500,
          message: 'Internal Error. Please contact user support!',
        };
      case 'unavailable':
        return {
          code: 503,
          message:
            'The service is currently unavailable. Please try again later!',
        };
      case 'data-loss':
        return {
          code: 410,
          message:
            'Unrecoverable data loss or corruption. Please contact user support!',
        };
      case 'unauthenticated':
        return {
          code: 401,
          message:
            'You does not have valid authentication credentials for the operation.',
        };
      default:
        return { code: 418, message: 'Error of unknown origin!' };
    }
  }
};
