import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { defineCustomElement } from 'ionicons/components/ion-icon.js';
import { addIcons } from 'ionicons';
import { eyedrop, clipboard, colorPalette } from 'ionicons/icons';

defineCustomElement();
addIcons({ eyedrop, clipboard, colorPalette });


window.resizeTo(500, 375);

createApp(App).mount('#app')
