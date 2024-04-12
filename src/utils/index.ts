import { ColorContrastCalc } from 'color-contrast-calc';

export const computeContrast = (foreground: string, background: string) => {
  const foregroundRGB = ColorContrastCalc.colorFrom(foreground);
  const backgroundRGB = ColorContrastCalc.colorFrom(background);
  
  const ratio = foregroundRGB.contrastRatioAgainst(backgroundRGB);
  
  /**
   * Ratio should have at most two decimal places. Note that we do not round here
   * because a ratio of 4.995 should not be rounded up to 4.5.
   */
  return ratio.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
}