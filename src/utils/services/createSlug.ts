export const slugify = (text: string) => {
    return text
      .toString()                          // Convert to string (in case it's not)
      .toLowerCase()                       // Convert to lowercase
      .trim()                              // Trim whitespace from both ends
      .replace(/[\s_]+/g, '-')             // Replace spaces and underscores with hyphens
      .replace(/[^\w\-]+/g, '')            // Remove all non-word characters
      .replace(/\-\-+/g, '-')              // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, '')                  // Remove leading hyphen
      .replace(/-+$/, '');                 // Remove trailing hyphen
  }