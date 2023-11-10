<script setup lang="ts">
  import { ref } from 'vue';
  
  defineProps(['modelValue']);
  const emit = defineEmits(['update:modelValue']);

  const inputEl = ref();
  
  const openPicker = () => {
    try {
      inputEl.value.showPicker();
    } catch (e) {
      throw e;
    }
  }
  
  const onInput = (ev: Event) => {
    emit('update:modelValue', (ev.target as HTMLInputElement).value)
  }
</script>

<template>
  <div>
    <button @click="openPicker()" class="color-picker-button" title="Open color picker" aria-label="Open color picker">
      <ion-icon aria-hidden="true" name="color-palette"></ion-icon>
    </button>
    <input
      aria-hidden="true"
      tabindex="-1" 
      type="color" 
      ref="inputEl" 
      :value="modelValue"
      @input="onInput($event)" 
    />
  </div>
</template>

<style scoped>
  input[type=color] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
</style>