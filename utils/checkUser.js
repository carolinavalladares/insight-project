export function checkUserLoggedIn(user, loading, route) {
  if (loading) return;
  if (!user) {
    if (route.pathname === "/auth/login") {
      return;
    }
    return route.push("/auth/login");
  } else if (user) {
    if (route.pathname === "/dashboard") {
      return;
    }
    return route.push("/dashboard");
  }
}
