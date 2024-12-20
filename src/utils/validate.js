const validatePassword = (val) => {
  if (val == "") {
    return "Please enter password";
  }
  if (val.length < 8) {
    return "Password should contain atleast 8 characters";
  }

  return false;
};

const validateEmail = (val) => {
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

const validatePhone = (val) => {
  if (val == "") {
    return "Please enter phone number";
  }
  if (val.toString().length != 10) {
    return "Please enter a valid phone number";
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

  if (!isErrorPassword) {
    if (password !== confirmPassword) {
      isErrorConfirm = "Enter same passwords in both fields";
    }
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
export const validateUpdate = ({ name, email, oldPass, newPass }) => {
  const isErrName = validateName(name);
  const isErrEmail = validateEmail(email);
  const isErrNewPass = validatePassword(newPass);
  const isErrOldPass = oldPass === "" ? "Please enter password" : false;

  if (!isErrEmail && !isErrName && !isErrNewPass && !isErrOldPass) {
    return true;
  }

  return {
    name: isErrName,
    email: isErrEmail,
    oldPass: isErrOldPass,
    newPass: isErrNewPass,
  };
};
