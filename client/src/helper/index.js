export function setAccessTokenForUser(value) {
  localStorage.setItem("accessTokenUser", JSON.stringify(value));
  return true;
}

export function accessTokenFromLocalStorageOfUser() {
  const token = localStorage.getItem("accessTokenUser");
  if (token) {
    return "Bearer " + JSON.parse(token);
  }
  return null;
}
