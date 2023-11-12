<script setup lang="ts">  
  const props = defineProps({
    color: String,
    hint: String
  });
  
  const copyBackground = async () => {
    await navigator.clipboard.writeText(props.color!);
  }
</script>

<template>
  <button class="copy-color-button" :title="props.hint" :aria-label="props.hint" @click="copyBackground()">
    <ion-icon aria-hidden="true" name="clipboard"></ion-icon>
  </button>
</template>