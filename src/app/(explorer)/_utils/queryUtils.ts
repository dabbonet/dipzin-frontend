export const getPatternHandle = (pattern: string): string => {
  switch (pattern) {
    case 'categories':
      return 'apps';
    case 'tag':
    case 'tags':
      return 'screens';
    case 'flowActions':
      return 'flows';
    case 'flowAction':
      return 'flow';
    case 'component':
      return 'components';
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

export const singularToPlural = (word: string): string => {
  // Check if the word ends with 'y' but not 'ies'
  if (word.endsWith('y') && !word.endsWith('ies')) {
    return `${word.slice(0, -1)}ies`;
  }
  
  // Avoid pluralizing words that end with 'ing'
  if (word.endsWith('ing')) {
    return word;
  }

  // Add 's' only if it doesn't already end with 's'
  if (!word.endsWith('s')) {
    return `${word}s`;
  }
  
  return word; // If the word is already plural, return as is
};


// Helper function to safely decode items
export const safeDecode = (item: string) => {
  try {
    // Try to decode the item, if it’s encoded
    return decodeURIComponent(item);
  } catch (e) {
    // If decoding fails, return the original string
    return item;
  }
};