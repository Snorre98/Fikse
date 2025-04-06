/**
 * Validates a Norwegian organization number
 * https://vatstack.com/articles/norway-vat-number-validation
 * The organization number consists of 9 digits where the last digit is a check digit
 * calculated using modulus 11 with specific weights.
 * 
 * @param orgNumber - The organization number to validate (as a string)
 * @returns boolean - True if the organization number is valid, false otherwise
 */
export function validateNorwegianOrgNumber(orgNumber: string): boolean {
    // Remove any whitespace
    const cleanedNumber = orgNumber.trim().replace(/\s/g, '');
    
    // Check if the input consists of exactly 9 digits
    if (!/^\d{9}$/.test(cleanedNumber)) {
      return false;
    }
    
    // The weights used for validation (from left to right)
    const weights = [3, 2, 7, 6, 5, 4, 3, 2];
    
    // Extract the digits except the check digit
    const digits = cleanedNumber.slice(0, 8).split('').map(Number);
    
    // Get the check digit
    const providedCheckDigit = Number(cleanedNumber[8]);
    
    // Calculate the sum of products
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      sum += digits[i] * weights[i];
    }
    
    // Calculate the remainder when divided by 11
    const remainder = sum % 11;
    
    // Calculate the expected check digit
    // If the remainder is 0, the check digit is 0
    // If the expected check digit would be 10, the org number is invalid
    const expectedCheckDigit = remainder === 0 ? 0 : 11 - remainder;
    
    // If the expected check digit is 10, the org number is not valid
    if (expectedCheckDigit === 10) {
      return false;
    }
    
    // Check if the provided check digit matches the expected check digit
    return providedCheckDigit === expectedCheckDigit;
  }
  
  /**
   * Example usage:
   * 
   * const validOrgNumber = "971524960";
   * const isValid = validateNorwegianOrgNumber(validOrgNumber);
   * console.log(`Organization number ${validOrgNumber} is ${isValid ? 'valid' : 'invalid'}`);
   */