function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login/new";
}

function isLoggedUser() {
  const token = localStorage.getItem("token");
  return token ? true : false;
}

export { logout, isLoggedUser };
