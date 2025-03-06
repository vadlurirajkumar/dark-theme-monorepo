/**
 * Get local timestamp using browser language and timezone.
 * @returns timestamp in local time format
 * 
 * @example
 * const currentTime = getLocalizedTimestamp();
 * 
 */
export function getLocalizedTimestamp(): string {
  const locale = navigator.language || "en-US"; // Get the browser's locale, default to "en-US"
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; // Get the browser's timezone, default to "UTC"

  return new Date().toLocaleString(locale, {
    timeZone,
    hour12: false, // Defaults to 24-hour format; change to true for 12-hour format
  });
}

