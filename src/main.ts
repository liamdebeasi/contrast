import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { defineCustomElement } from 'ionicons/components/ion-icon.js';
import { addIcons } from 'ionicons';
import { checkmark, eyedrop, clipboard, colorPalette } from 'ionicons/icons';

defineCustomElement();
addIcons({ checkmark, eyedrop, clipboard, colorPalette });

createApp(App).mount('#app')
