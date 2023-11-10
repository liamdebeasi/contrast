<script setup lang="ts">  
  const props = defineProps({
    color: String,
  });
  
  const copyBackground = async () => {
    await navigator.clipboard.writeText(props.color!);
  }
</script>

<template>
  <button class="copy-color-button" title="Copy color to clipboard" aria-label="Copy color to clipboard" @click="copyBackground()">
    <ion-icon aria-hidden="true" name="clipboard"></ion-icon>
  </button>
</template>