export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

// Правила IsStrongPassword. Заглавная буква обязательна по умолчанию, но указана явно, чтобы не было неочевидного поведения
export const PASSWORD_STRENGTH_OPTIONS = {
  minLength: PASSWORD_MIN_LENGTH,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
} as const;

export const PASSWORD_STRENGTH_MESSAGE = `Password must be at least ${PASSWORD_MIN_LENGTH} characters and contain a lowercase letter, an uppercase letter, a number and a symbol`;
