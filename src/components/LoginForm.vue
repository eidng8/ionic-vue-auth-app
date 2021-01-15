<!--
  - GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
  -
  - author eidng8
  -
  -->

<template>
  <ion-card>
    <ion-card-content>
      <form @submit.prevent.stop="submit">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input required type="email" v-model="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <password-with-eye-toggle required v-model="password">
            </password-with-eye-toggle>
          </ion-item>
          <ion-item lines="none"></ion-item>
          <ion-item lines="none">
            <ion-button type="submit" color="success" size="block" slot="start">
              Login
            </ion-button>
            <ion-button slot="end" size="block">Register</ion-button>
          </ion-item>
        </ion-list>
      </form>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/vue';

import { AuthState, Store } from '@/store';
import PasswordWithEyeToggle from '@/components/PasswordWithEyeToggle.vue';

export default defineComponent({
  name: 'LoginForm',
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    PasswordWithEyeToggle,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const store: Store = useStore<AuthState>();

    return {
      email,
      password,
      submit: () => {
        store.dispatch('login', {
          email: email.value,
          password: password.value,
        });
      },
    };
  },
});
</script>

<style scoped></style>
