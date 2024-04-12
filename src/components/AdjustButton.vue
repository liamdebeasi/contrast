<script setup lang="ts">  
  import { colorWand, checkmark } from 'ionicons/icons';
  import { computeContrast, computeFallbackColors } from '../utils';
  import { ColorContrastCalc } from 'color-contrast-calc';
  import { ref } from 'vue';

  const props = defineProps(['modelValue', 'foreground', 'hint']);
  const emit = defineEmits(['update:modelValue']);
  
  const showAdjustButton = ref(true);

  const adjustColor = () => {
    const contrast = computeContrast(props.foreground, props.modelValue);
    
    if (contrast < 4.5) {
      const foregroundColor = ColorContrastCalc.colorFrom(props.foreground);
      const backgroundColor = ColorContrastCalc.colorFrom(props.modelValue);
      
      let adjustedBackgroundColor = foregroundColor.findBrightnessThreshold(backgroundColor, 'AA');
      
      /**
       * Sometimes findBrightnessThreshold can't find a color with sufficient contrast.
       * When that happens use either #000 or #fff, whichever has the higher contrast.
       */
      const computeContrastAgain = computeContrast(props.foreground, adjustedBackgroundColor.hexCode);
      if (computeContrastAgain < 4.5) {
        const fallbackColor = computeFallbackColors(props.modelValue);
        adjustedBackgroundColor = ColorContrastCalc.colorFrom(fallbackColor);
      }

      emit('update:modelValue', adjustedBackgroundColor.hexCode);
    }
    
    showAdjustButton.value = false;
    
    // Show a visual indicator that the operation succeeded to the clipboard.
    setTimeout(() => {
      showAdjustButton.value = true;
    }, 3000);
  }  
</script>

<template>
  <div class="button-wrapper">
    <button v-if="showAdjustButton" @click="adjustColor()" class="app-icon" :title="props.hint" :aria-label="props.hint">
      <ion-icon aria-hidden="true" :icon="colorWand"></ion-icon>
    </button>
    <div class="app-icon" v-if="!showAdjustButton">
      <ion-icon aria-label="Background color adjusted" :icon="checkmark" class="checkmark"></ion-icon>
    </div>
    <div class="status" role="status" aria-live="assertive">
      <p v-if="!showAdjustButton">Background color adjusted</p>
    </div>
  </div>
</template>

<style scoped>
  .checkmark {
    cursor: default;
  }
  
  .status {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
</style>