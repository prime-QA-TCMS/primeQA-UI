type ValidationFunction = (...args: any[]) => string | null;

export const validationRules: Record<string, ValidationFunction> = {
  required: (value: any) => {
    if (value === null || value === undefined || value === '' || value === false)
      return 'This field is required.';
    return null;
  },

  email: (value: string) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address.';
  },

  minLength: (value: string, length: number) => {
    if (!value) return null;
    return value.length < length ? `Must be at least ${length} characters.` : null;
  },

  maxLength: (value: string, length: number) => {
    if (!value) return null;
    return value.length > length ? `Must be fewer than ${length} characters.` : null;
  },

  numberRange: (value: number, min: number, max: number) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return 'Must be a number.';
    if (numValue < min) return `Must be at least ${min}.`;
    if (numValue > max) return `Must be no more than ${max}.`;
    return null;
  },
};
