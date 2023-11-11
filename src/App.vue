<script setup lang="ts">
import { ref, watch } from 'vue';
import { ColorContrastCalc } from 'color-contrast-calc';

import DropperButton from './components/DropperButton.vue';
import CopyButton from './components/CopyButton.vue';
import PaletteButton from './components/PaletteButton.vue';
import ColorInput from './components/ColorInput.vue';

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

const foreground = ref('#e7c296');
const background = ref('#29344b');
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
 * Re-compute the color contrast whenever
 * the background or foreground changes.
 * Also update the meta tag for theme-color
 * so the top of the container flows
 * into the browser navigation bar if supported.
 */
watch([foreground, background], () => {
  updateMetaThemeColor();
  contrast.value = getContrast();
});

updateMetaThemeColor();

</script>

<template>
  <main :style="{ '--background': background, '--foreground': foreground, '--background-tint': background + '30', '--foreground-tint': foreground + '30', '--background-shade': background + '50', '--foreground-shade': foreground + '50' }">
    <div class="main-content">
      <div class="results">
        <h1>{{ contrast }}</h1>

        <div>Small: <strong>{{ computePass([4.5, 7])}}</strong></div>
        <div>Large: <strong>{{ computePass([3, 4.5])}}</strong></div>
        <div>UI: <strong>{{ computePass([3, undefined])}}</strong></div>
      </div>
      <div class="foreground color-row">
        <div class="button-group">
          <DropperButton v-model="background" />
          <CopyButton :color="background" />
          <ColorInput id="background-input" v-model="background" />
        </div>
        <div class="button-group">
          <PaletteButton v-model="background" />
        </div> 
       </div>
    </div>
    <div class="bottom-bar">
      <div class="background color-row">
          <div class="button-group">
            <DropperButton v-model="foreground" />
            <CopyButton :color="foreground" />
            <ColorInput id="foreground-input" v-model="foreground" />
          </div>
          <div class="button-group">
            <PaletteButton v-model="foreground" />
          </div>
      </div>
    </div>
  </main>
</template>

<style>
  h1 {
    margin: 0px 0px 16px 0px;
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
    --text-color: var(--background);
    --border-color: var(--background);
  }
  
  #background-input {
    --text-color: var(--foreground);
    --border-color: var(--foreground);
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
  
  button {
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
    font-size: 1.5rem;
  
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
    .foreground.color-row button:hover {
      background: var(--foreground-tint);
    }
    
    .background.color-row button:hover {
      background: var(--background-tint);
    }
    
    .foreground.color-row button:focus-visible {
      background: var(--foreground-shade);
    }
    
    .background.color-row button:focus-visible {
      background: var(--background-shade);
    }
  }
  
  .main-content {
    width: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    
    background: var(--background);
    color: var(--foreground);
  }
  
  .bottom-bar {
    min-height: 50px;
    width: 100%;
    
    display: flex;
    align-items: center;
    
    background: var(--foreground);
    color: var(--background);    
  }
  
  .bottom-bar .color-row {
    width: 100%; /* hack */
  }
</style>