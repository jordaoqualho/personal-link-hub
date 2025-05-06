// Validates email format using a basic pattern
export function validateEmail(email: string): boolean {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email);
}

// Accepts alphabetic characters and spaces (including accented letters)
export function validateName(name: string): boolean {
  const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return NAME_REGEX.test(name);
}

// Validates a username for use in URLs: 3–20 chars, lowercase letters, dashes, or underscores, and not a reserved word
export function validateUsername(username: string): boolean {
  const USERNAME_REGEX = /^[a-z_-]{3,20}$/;
  const RESERVED_USERNAMES = ["admin", "login", "settings", "dashboard", "api"];

  if (!USERNAME_REGEX.test(username)) return false;
  if (RESERVED_USERNAMES.includes(username)) return false;

  return true;
}

export function getRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}
