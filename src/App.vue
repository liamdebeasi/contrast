<script setup lang="ts">
import { ref, watch } from 'vue';
import { ColorContrastCalc } from 'color-contrast-calc';

import DropperButton from './components/DropperButton.vue';
import CopyButton from './components/CopyButton.vue';
import PaletteButton from './components/PaletteButton.vue';
import ColorInput from './components/ColorInput.vue';
import ModeButton from './components/ModeButton.vue';
import AdjustButton from './components/AdjustButton.vue';

const getContrast = () => {
  const foregroundRGB = ColorContrastCalc.colorFrom(foreground.value);
  const backgroundRGB = ColorContrastCalc.colorFrom(background.value);
  
  const ratio = foregroundRGB.contrastRatioAgainst(backgroundRGB);
  
  /**
   * Ratio should have at most
   * two decimal places. Note that we
   * do not round here because a
   * ratio of 4.995 should not be
   * founded up to 4.5.
   */
  return ratio.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
}

const getDeveloperMode = () => {
  const res = localStorage.getItem('developermode');
  return res === 'true';
}

const foreground = ref('#f5e8c8');
const background = ref('#4c3163');
const developerMode = ref(getDeveloperMode());

/**
 * These refs allow us to change the text colors
 * on the UI in the event that the user chooses foreground
 * and background colors that have low contrast. Without
 * this, the text likely may not be readable.
 */
const foregroundTextColor = ref(background.value);
const backgroundTextColor = ref(foreground.value);

const contrast = ref(getContrast())
const metaThemeColor = document.querySelector('meta[name=theme-color]') as HTMLMetaElement;

const updateMetaThemeColor = () => {
  metaThemeColor.content = background.value;
}

const computePass = ([aaThreshold, aaaThreshold]: [number, number | undefined]) => {
  if (aaaThreshold !== undefined && contrast.value >= aaaThreshold) {
    return 'AAA';
  } else if (contrast.value >= aaThreshold) {
    return 'AA';
  } else {
    return 'Fail';
  }
}

/**
 * Used for basic mode to give a general
 * idea of how "good" two colors are
 * with relation to contrast color.
 */
const computeRating = () => {
  if (contrast.value >= 7) {
    return 'GREAT';
  } else if (contrast.value >= 4.5) {
    return 'PASS';
  } else {
    return 'FAIL';
  }
}

/**
 * Re-compute the color contrast whenever
 * the background or foreground changes.
 * Also update the meta tag for theme-color
 * so the top of the container flows
 * into the browser navigation bar if supported.
 */
watch([foreground, background], () => {
  updateMetaThemeColor();
  const ratio = contrast.value = getContrast();
  
  /**
   * Typically the textColor refs are the
   * same as the background/foreground refs.
   * However, if the color contrast is < 3
   * then the text likely won't be readable.
   * As a result, we may need to change the color
   * to either white or black so it is readable.
   */
  if (ratio <= 3) {
    
    /**
     * Compare white text and black text contrast on chosen
     * background and use whichever one has the higher ratio.
     */
    const whiteForegroundRGB = ColorContrastCalc.colorFrom('#ffffff');
    const blackForegroundRGB = ColorContrastCalc.colorFrom('#000000');
    const backgroundRGB = ColorContrastCalc.colorFrom(background.value);
    
    const whiteRatio = whiteForegroundRGB.contrastRatioAgainst(backgroundRGB);
    const blackRatio = blackForegroundRGB.contrastRatioAgainst(backgroundRGB);
    
    if (whiteRatio >= blackRatio) {
      foregroundTextColor.value = backgroundTextColor.value = '#ffffff';
    } else {
      foregroundTextColor.value = backgroundTextColor.value = '#000000';
    }
  } else {
    foregroundTextColor.value = background.value;
    backgroundTextColor.value = foreground.value;
  }
});

updateMetaThemeColor();

</script>

<template>
  <main :style="{
    '--foreground-text-color': foregroundTextColor,
    '--background-text-color': backgroundTextColor,
    '--foreground-text-color-tint': foregroundTextColor + '30',
    '--foreground-text-color-shade': foregroundTextColor + '50',
    '--background-text-color-tint': backgroundTextColor + '30',
    '--background-text-color-shade': backgroundTextColor + '50',
    '--background': background, 
    '--foreground': foreground
  }">
    <div class="main-content">
      <div class="results">        
        <span v-if="developerMode === true">
          <h1>{{ contrast }}</h1>
  
          <div>Small: <strong>{{ computePass([4.5, 7])}}</strong></div>
          <div>Large: <strong>{{ computePass([3, 4.5])}}</strong></div>
          <div>UI: <strong>{{ computePass([3, undefined])}}</strong></div>
        </span>
        
        <span v-if="developerMode === false">
          <h1>{{ computeRating() }}</h1>
          <h2>{{ contrast }}</h2>
        </span>
        
        <div class="button-column">
          <ModeButton v-model="developerMode" :hint="developerMode === false ? 'Enter developer mode' : 'Exit developer mode'" />
          <AdjustButton v-model="background" hint="Adjust background color to meet AA color contrast level" />
        </div>

      </div>
      <div class="foreground color-row">
        <div class="button-group">
          <DropperButton v-model="background" hint="Open eye dropper tool to select background color" />
          <CopyButton :color="background" hint="Copy background color to clipboard" />
          <ColorInput id="background-input" v-model="background" hint="Enter a hex color for the background color" />
        </div>
        <div class="button-group">
          <PaletteButton v-model="background" hint="Open color palette to select background color" />
        </div> 
       </div>
    </div>
    <div class="bottom-bar">
      <div class="background color-row">
          <div class="button-group">
            <DropperButton v-model="foreground" hint="Open eye dropper tool to select foreground color" />
            <CopyButton :color="foreground" hint="Copy foreground color to clipboard" />
            <ColorInput id="foreground-input" v-model="foreground" hint="Enter a hex color for the foreground color" />
          </div>
          <div class="button-group">
            <PaletteButton v-model="foreground" hint="Open color palette to select foreground color" />
          </div>
      </div>
    </div>
  </main>
</template>

<style>
  h1 {
    margin: 0px 0px 16px 0px;
  }
  
  h2 {
    margin: 0;
  }

  main {   
    --padding: 16px;
 
    width: 100%;
    height: 100dvh;
    
    display: flex;
    flex-direction: column;
    
    overflow: hidden;
    
    text-align: start;    
  }
  
  #foreground-input {
    --text-color: var(--foreground-text-color);
    --border-color: var(--foreground-text-color);
  }
  
  #background-input {
    --text-color: var(--background-text-color);
    --border-color: var(--background-text-color);
  }
  
  .results {
    padding: var(--padding);
  }
  
  .color-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
        
    padding: calc(var(--padding) * 0.5) 0px;    
  }
  
  .button-group {
    display: flex;
  }
  
  .app-icon {
    appearance: none;
    cursor: pointer;
    
    outline: none;
    background: none;
    border: none;
    
    color: inherit;
    
    padding: var(--padding);
    margin: 0px 6px;
    
    text-transform: uppercase;
    font-family: inherit;
    font-size: 1.6rem;
  
    display: flex;
    align-items: center;
    justify-content: center;
    
    border-radius: 100%;
    height: 100%;    
  }
  
  .eyedropper-button {
    margin-right: 0px;
  }
  
  @media (any-hover: hover) {
    .foreground.color-row button:hover,
    .results button:hover {
      background: var(--background-text-color-tint);
    }
    
    .background.color-row button:hover {
      background: var(--foreground-text-color-tint);
    }
    
    .foreground.color-row button:focus-visible,
    .results button:focus-visible {
      background: var(--background-text-color-shade);
    }
    
    .background.color-row button:focus-visible {
      background: var(--foreground-text-color-shade);
    }
  }
  
  .main-content {    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    
    background: var(--background);
    color: var(--background-text-color);
    
    padding-top: env(safe-area-inset-top);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    
    font-size: 1.35rem;
  }
  
  .bottom-bar {
    min-height: 50px;
    
    display: flex;
    align-items: center;
    
    background: var(--foreground);
    color: var(--foreground-text-color); 
    
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
  
  .bottom-bar .color-row {
    width: 100%; /* hack */
  }
  
  .button-column {
    display: flex;
    flex-direction: column;
    
    position: absolute;
    
    inset-inline-end: 0;
    top: 8px;
  }
</style>