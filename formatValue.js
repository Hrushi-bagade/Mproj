// formatValue.js

/**
 * Formats a number by rounding it to the specified number of decimal places.
 * If useLocale is true, the result will be returned as a localized string.
 *
 * @param {string|number} value - The value to format.
 * @param {number} decimals - The number of decimal places to round off to (default is 0).
 * @param {boolean} useLocale - If true, returns a localized string (default is false).
 * @returns {string|number} - The formatted number as either a number or a localized string.
 */
export function formatDecimalValue(value, decimals = 2, useLocale = true) {
    // Convert the input value to a number
    const num = Number(value);
  
    // If the value is not a valid number, return it as is
    if (isNaN(num)) {
      return value;
    }
  
    // Round the number to the specified decimal places
    const rounded = Number(num.toFixed(decimals));
  
    // Return the number as a localized string if requested, else as a number
    return useLocale ? rounded.toLocaleString() : rounded;
  }
  