function requireAuth(nextState, replace) {
  if (localStorage.getItem("isAuthenticated") == "false" ||  localStorage.getItem("isAuthenticated") === null) {
    replace({
      pathname: '/'
    })
  }
}

export default requireAuth;
