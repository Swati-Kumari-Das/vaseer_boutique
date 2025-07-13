export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
};
