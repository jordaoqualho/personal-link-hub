export const validateTitle = (value: string): string | undefined => {
  if (!value.trim()) return "Title is required";
  if (value.length > 50) return "Title must be less than 50 characters";
  if (/[<>]/.test(value)) return "Title cannot contain < or > characters";
  return undefined;
};

export const validateUrl = (value: string): string | undefined => {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) {
      return "URL must start with http:// or https://";
    }
    if (url.hostname.length > 255) return "URL is too long";
    return undefined;
  } catch {
    return "Please enter a valid URL";
  }
};

export const validateIconUrl = (value: string): string | undefined => {
  if (!value) return undefined;

  if (value.startsWith("data:image/")) {
    const base64Regex = /^data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,/;
    if (!base64Regex.test(value)) {
      return "Invalid base64 image format";
    }
    return undefined;
  }

  try {
    const url = new URL(value);
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const hasValidExtension = validExtensions.some((ext) => url.pathname.toLowerCase().endsWith(ext));
    if (!hasValidExtension) {
      return "Icon URL must be an image (jpg, jpeg, png, gif, webp, or svg)";
    }
    return undefined;
  } catch {
    return "Please enter a valid icon URL";
  }
};
