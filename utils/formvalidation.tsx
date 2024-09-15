type ValidationRule = (value: string) => string | null;

interface ValidationRules {
  [key: string]: ValidationRule[];
}

export const validateField = (value: string, rules: ValidationRule[]): string => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
    console.log(error);
  }
  return '';
};

export const validateForm = (values: { [key: string]: string }, rules: ValidationRules): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  for (const field in rules) {
    const fieldRules = rules[field];
    const error = validateField(values[field], fieldRules);
    console.log(field, error);
    if (error) errors[field] = error;
  }
  return errors;
};

// Predefined validation rules
export const required = (fieldName: string): ValidationRule => 
  (value: string) => value.trim() ? null : `${fieldName} is required`;

export const minLength = (length: number): ValidationRule => 
  (value: string) => value.length >= length ? null : `Must be at least ${length} characters long`;

export const isEmail: ValidationRule = 
  (value: string) => /\S+@\S+\.\S+/.test(value) ? null : 'Invalid email address';
