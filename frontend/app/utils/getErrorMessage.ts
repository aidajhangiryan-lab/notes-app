export function getErrorMessage(e: unknown): string {
  const message = (e as { data?: { message?: string | string[] } })?.data
    ?.message;
  if (Array.isArray(message)) return message.join(", ");
  return message ?? "Something went wrong";
}
