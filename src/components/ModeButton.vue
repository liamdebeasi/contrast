<script setup lang="ts">  
  import { hammer, hammerOutline } from 'ionicons/icons';
  const props = defineProps(['modelValue', 'hint']);
  const emit = defineEmits(['update:modelValue']);

  const toggleMode = () => {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue);
    localStorage.setItem('developermode', newValue.toString());
  }  
</script>

<template>
  <div class="button-wrapper">
    <button @click="toggleMode()" class="app-icon" :title="props.hint" :aria-label="props.hint">
      <ion-icon aria-hidden="true" :icon="props.modelValue === true ? hammer : hammerOutline"></ion-icon>
    </button>
  </div>
</template>