export const extractInitials = (name: string): string => {
  const words = name?.split(' ');
  let initials = '';

  for (let i = 0; i < words?.length; i += 1) {
    const firstChar = words[i]?.[0];
    if (firstChar) {
      initials += firstChar;
    }
  }

  return initials;
};

export function camelCaseToWords(s: string): string {
  const result = s.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const mergeIconFromObject = (icon: any | { hash: string, ext: string }): string => {
  if (icon && icon.hash && icon.ext) {
    return `${icon.hash}${icon.ext}`;
  }
  return '';
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
