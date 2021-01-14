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

      <login-form></login-form>
      <ion-icon name="eye"></ion-icon>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/vue';
import LoginForm from '@/components/LoginForm.vue';

export default defineComponent({
  name: 'Tab1',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    LoginForm,
    IonIcon,
  },
  setup() {
    onMounted(() => {
      // axios.post('login').then(res => console.log(res));
    });
  },
});
</script>

<style scoped></style>
