<!--
  - GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
  -
  - author eidng8
  -
  -->

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>auth-app</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">auth-app</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="page-content">
        <login-form></login-form>
        <message-box></message-box>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import LoginForm from '@/components/LoginForm.vue';
import MessageBox from '@/components/MessageBox.vue';

export default defineComponent({
  name: 'Tab1',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    LoginForm,
    MessageBox,
  },
});
</script>

<style scoped>
.page-content {
  width: 100%;
  height: calc(100% - 10px);
}
</style>
