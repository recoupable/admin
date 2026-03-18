/**
 * Masks an email address so sensitive info is not exposed.
 * e.g. "john.doe@example.com" → "jo***@ex***.com"
 */
export function maskEmail(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return "***";

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  const maskedLocal = local.slice(0, 2).padEnd(2, "*") + "***";

  const dotIndex = domain.lastIndexOf(".");
  if (dotIndex === -1) return `${maskedLocal}@***`;

  const domainName = domain.slice(0, dotIndex);
  const tld = domain.slice(dotIndex);
  const maskedDomain = domainName.slice(0, 2).padEnd(2, "*") + "***";

  return `${maskedLocal}@${maskedDomain}${tld}`;
}
