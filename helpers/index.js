

export function IsEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function getCurrentDate() {
  return new Date().toLocaleString()
}

export function isUsername(str) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(str);
}

export function isEmail(str) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(str);
}
