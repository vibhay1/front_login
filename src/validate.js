export default function validateRegistration(values) {
  let errors = {};
  if (values.hasOwnProperty('userName')) {
    if (!values.userName) {
      errors.userName = 'User name required.';
    } else if (!/^[a-zA-Z0-9. ]{2,}$/.test(values.userName)) {
      errors.userName = 'User name invalid.';
    }
  }
  if (values.hasOwnProperty('email')) {
    if (!values.email) {
      errors.email = 'Email required.';
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
      errors.email = 'Invalid email';
    }
  }

  if (values.hasOwnProperty('gender') && !values.gender) {
    errors.gender = 'Gender required.';
  }
  if (values.hasOwnProperty('password')) {
    if (!values.password) {
      errors.password = 'Password required.';
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) {
      errors.password = 'Invalid password it should be min 6 to 16  characters included one numeric value and special character (!,@,#,$,%,^,&,*)';
    }
  }

  if (values.hasOwnProperty('confirmPassword')) {
    if (values.hasOwnProperty('confirmPassword') && !values.confirmPassword) {
      errors.confirmPassword = 'Confirm password required.';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Confirm password not matched with entered password.';
    }
  }
  if (values.hasOwnProperty('interest')) {
    if (!values.interest) {
      errors.interest = 'Interest required.';
    }
  }

  if (values.hasOwnProperty('description') && !values.description) {
    errors.description = 'Description required.';
  }
  if (values.hasOwnProperty('profileImage') && !values.profileImage) {
    errors.profileImage = 'Profile image required.';
  }

  return errors;
};
