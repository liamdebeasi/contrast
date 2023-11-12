<script setup lang="ts">
  import { ref } from 'vue';
  
  const props = defineProps(['modelValue', 'hint']);
  const emit = defineEmits(['update:modelValue']);

  const inputEl = ref();
  
  const openPicker = () => {
    try {
      
      /**
       * showPicker is not implemented on iOS
       * yet: https://bugs.webkit.org/show_bug.cgi?id=261703
       */
      inputEl.value.showPicker();
      inputEl.value.focus();
    } catch (e) {
      throw e;
    }
  }
  
  const onInput = (ev: Event) => {
    emit('update:modelValue', (ev.target as HTMLInputElement).value)
  }
</script>

<template>
  <div class="button-wrapper">
    <button @click="openPicker()" class="app-icon" :title="props.hint" :aria-label="props.hint">
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
  .button-wrapper {
    position: relative;
  }

  input[type=color] {
    position: absolute;
    
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    width: 100%;
    height: 100%;
    
    opacity: 0;
    pointer-events: none;
  }
</style>