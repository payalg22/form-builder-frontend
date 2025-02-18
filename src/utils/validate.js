const validatePassword = (val) => {
  if (val == "") {
    return "Please enter password";
  }
  const passRegEx =
    /^(?=.*[!@#$%^&*(),.?":{}|<>_])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  if (!passRegEx.test(val)) {
    return "Password should be 8 characters long, contain atleast 1 number, 1 special character and letters";
  }

  return false;
};

export const validateEmail = (val) => {
  if (val == "") {
    return "Please enter email";
  }
  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailRegEx.test(val)) {
    return "Please enter valid email";
  }

  return false;
};

const validateName = (val) => {
  if (val == "") {
    return "Please enter name";
  }

  return false;
};

//validate login
export const validateLogin = ({ email, password }) => {
  const isErrorEmail = validateEmail(email);
  const isErrorPassword = !password ? "Please enter password" : false;

  if (!isErrorEmail && !isErrorPassword) {
    return true;
  }

  return { email: isErrorEmail, password: isErrorPassword };
};

//validate signup
export const validateSignUp = ({ name, email, password, confirmPassword }) => {
  const isErrorName = validateName(name);
  const isErrorEmail = validateEmail(email);
  const isErrorPassword = validatePassword(password);
  let isErrorConfirm = false;

  if (!confirmPassword) {
    isErrorConfirm = "Please confirm password";
  } else if (password !== confirmPassword) {
    isErrorConfirm = "Enter same passwords in both fields";
  }

  if (!isErrorEmail && !isErrorPassword && !isErrorName && !isErrorConfirm) {
    return true;
  }

  return {
    name: isErrorName,
    email: isErrorEmail,
    password: isErrorPassword,
    confirmPassword: isErrorConfirm,
  };
};

//validate update form
export const validateUpdate = ({ name, email, oldPassword, newPassword }) => {
  const isErrName = validateName(name);
  const isErrEmail = validateEmail(email);
  let isErrNewPass = false;
  let isErrOldPass = false;

  if (newPassword || oldPassword) {
    isErrNewPass = validatePassword(newPassword);
    isErrOldPass = oldPassword === "" && "Please enter your password";
  }

  if (!isErrEmail && !isErrName && !isErrNewPass && !isErrOldPass) {
    return true;
  }

  return {
    name: isErrName,
    email: isErrEmail,
    oldPassword: isErrOldPass,
    newPassword: isErrNewPass,
  };
};
