/**
 * Converts a transformed keyboard layout (array of objects) back to the original number[][] format.
 * @param transformedLayout An array of objects where each object has a 'text' and 'value' property.
 * @returns {number[][]} The original number[][] format.
 */
export function revertKeyboardLayout(transformedLayout: { text: string, value: number[] }[]): number[][] {
  return transformedLayout.map(item => item.value);
}

/**
 * Generates a unique hash for a given keyboard layout.
 * @param keyboardLayout An array of 5 pairs of numbers ([[num1, num2], ...])
 * @returns {Promise<string>} A SHA-256 hash of the sorted layout
 */
export async function generateKeyboardHash(keyboardLayout: number[][]): Promise<string> {
  const layoutString = JSON.stringify(keyboardLayout);
  const encoder = new TextEncoder();
  const data = encoder.encode(layoutString);
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}
