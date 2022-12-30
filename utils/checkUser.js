export function checkUserLoggedIn(user, loading, route, path) {
  if (loading) return;
  if (!user) {
    if (route.pathname === "/auth/login") {
      return;
    }
    return route.push("/auth/login");
  } else if (user) {
    if (route.pathname === path) {
      return;
    }
    return route.push(path);
  }
}
