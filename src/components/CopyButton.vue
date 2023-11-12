<script setup lang="ts">
  import { ref } from 'vue';
  const props = defineProps({
    color: String,
    hint: String
  });
  
  const showCopyButton = ref(true);
  
  const copyBackground = async () => {
    await navigator.clipboard.writeText(props.color!);
    
    showCopyButton.value = false;
    
    /**
     * Show a visual indicator that
     * the text was copied to the clipboard.
     */
    setTimeout(() => {
      showCopyButton.value = true;
    }, 3000);
  }
</script>

<template>
  <button v-if="showCopyButton" class="app-icon" :title="props.hint" :aria-label="props.hint" @click="copyBackground()">
    <ion-icon aria-hidden="true" name="clipboard"></ion-icon>
  </button>
  <div class="app-icon" v-if="!showCopyButton">
    <ion-icon aria-label="Color copied to clipboard" name="checkmark" class="checkmark"></ion-icon>
  </div>
  <div class="status" role="status" aria-live="assertive">
    <p v-if="!showCopyButton">Color copied to clipboard</p>
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