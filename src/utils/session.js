function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

function isLoggedUser() {
  const token = localStorage.getItem("token");
  return token ? true : false;
}

export { logout, isLoggedUser };
