<script setup lang="ts">  
  import { colorWand } from 'ionicons/icons';
  const props = defineProps(['modelValue', 'hint']);
  const emit = defineEmits(['update:modelValue']);

  const adjustColor = () => {
    emit('update:modelValue', '#0088cc');
  }  
</script>

<template>
  <div class="button-wrapper">
    <button @click="adjustColor()" class="app-icon" :title="props.hint" :aria-label="props.hint">
      <ion-icon aria-hidden="true" :icon="colorWand"></ion-icon>
    </button>
  </div>
</template>