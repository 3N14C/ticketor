type FieldError = { message?: string } | string | null | undefined;

export const getFieldError = (errors: FieldError[]): string | undefined => {
	const firstError = errors.find(Boolean);

	if (!firstError) return undefined;

	return typeof firstError === "string" ? firstError : firstError.message;
};