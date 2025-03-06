interface FormatCurrencyOptions {
  amount: number;
  currency?: string;
  minFractionDigits?: number;
  locale?: string;
  trim?: boolean;
}

/**
 * Formats a given amount into a currency string based on the specified currency code, minimum fraction digits, locale, 
 * and an optional trim option to convert to "lakh" or "thousand".
 *
 * @param amount - The numeric amount to be formatted.
 * @param currency - The currency code (e.g., 'USD', 'INR') for formatting. Defaults to 'INR'.
 * @param minFractionDigits - The minimum number of fraction digits to display. Defaults to 2.
 * @param locale - The locale to use for formatting. Defaults to 'en-IN' for Indian numbering format.
 * @param trim - If true, large numbers are converted to "lakh" for 6+ digits or "thousand" for 3+ digits.
 * 
 * @returns A formatted currency string according to the specified locale and options, with optional trimming.
 *
 * @example
 * ```typescript
 * formatCurrency({ amount: 1500000, currency: 'INR', minFractionDigits: 2, locale: 'en-IN', trim: true }); // "₹15 lakh"
 * formatCurrency({ amount: 5000, currency: 'USD', minFractionDigits: 2, locale: 'en-US', trim: true }); // "$5K"
 * formatCurrency({ amount: 1500000 }); // "₹15,00,000.00" without trim
 * ```
 */
export const formatCurrency = ({
  amount,
  currency = 'INR',
  minFractionDigits = 0,
  locale = 'en-IN',
  trim = true,
}: FormatCurrencyOptions): string => {
  // Convert to "lakh" or "thousand" format if trim is enabled
  if (trim) {
    if (amount >= 1_00_000) {
      amount = amount / 1_00_000;
      return `${new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: minFractionDigits,
      }).format(amount)} L`;
    } else if (amount >= 1_000) {
      amount = amount / 1_000;
      return `${new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: minFractionDigits,
      }).format(amount)}K`;
    }
  }

  // Default formatting without trimming
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: minFractionDigits,
  }).format(amount);
};
