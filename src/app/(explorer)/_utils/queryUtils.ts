export const getPatternHandle = (pattern: string): string => {
  switch (pattern) {
    case 'category':
    case 'categories':
      return 'apps';
    case 'tags':
      return 'screens';
    case 'flowAction':
      return 'flows';
    default:
      return pattern || '';
  }
};

// Utility function to convert plural to singular
export const pluralToSingular = (word: string): string => {
  if (word.endsWith('ies')) {
    return `${word.slice(0, -3)}y`;
  } if (word.endsWith('s')) {
    return word.slice(0, -1);
  }
  return word;
};
