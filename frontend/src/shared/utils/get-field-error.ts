type FieldError = { message?: string } | string | null | undefined;

/**
 * Extracts a human-readable message from TanStack Form's `field.state.meta.errors`.
 *
 * With a Standard Schema validator (Zod) each entry is a `StandardSchemaV1Issue`
 * (`{ message: string }`); custom validators may return plain strings. Returns the
 * first available message, or `undefined` when the field has no errors.
 */
export const getFieldError = (errors: FieldError[]): string | undefined => {
	const firstError = errors.find(Boolean);

	if (!firstError) return undefined;

	return typeof firstError === "string" ? firstError : firstError.message;
};
