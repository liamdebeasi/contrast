<script setup lang="ts">  
  defineProps(['modelValue']);
  const emit = defineEmits(['update:modelValue']);
  
  const supportsEyeDropper = !!(window as any).EyeDropper;
  let eyeDropper: any;
  
  if (supportsEyeDropper) {
    eyeDropper = new (window as any).EyeDropper(); // no types for this yet
  }
  
  const selectColor = async () => {
    const res = await eyeDropper.open();
    
    emit('update:modelValue', res.sRGBHex);
  }
</script>

<template>
  <button v-if="supportsEyeDropper" class="eyedropper-button" aria-label="Select color" @click="selectColor()">
    <ion-icon aria-hidden="true" name="eyedrop"></ion-icon>
  </button>
</template>