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
            <ion-label position="floating">Name</ion-label>
            <ion-input required type="text" v-model="name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input required type="email" v-model="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <password-with-eye-toggle required v-model="password">
            </password-with-eye-toggle>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <password-with-eye-toggle
              required
              ref="pc"
              v-model="passwordConfirm"
            >
            </password-with-eye-toggle>
          </ion-item>
          <ion-item lines="none"></ion-item>
          <ion-item lines="none">
            <ion-button
              color="danger"
              router-link="/tabs/tab1"
              size="block"
              slot="start"
            >
              Cancel
            </ion-button>
            <ion-button type="submit" slot="end" size="block">
              Register
            </ion-button>
          </ion-item>
        </ion-list>
      </form>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from 'vue';
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

import { AllActions, AuthState, Store } from '@/store';
import PasswordWithEyeToggle from '@/components/PasswordWithEyeToggle.vue';

export default defineComponent({
  name: 'RegisterForm',
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
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const store: Store = useStore<AuthState>();
    const pc = ref<ComponentPublicInstance<HTMLInputElement>>();

    return {
      pc,
      name,
      email,
      password,
      passwordConfirm,
      submit: () => {
        // if (password.value && password.value != passwordConfirm.value) {
        //   pc.value?.$el?.setCustomValidity(
        //     'Password confirmation must be identical to password',
        //   );
        //   return;
        // }

        store.dispatch(AllActions.register, {
          name: name.value,
          email: email.value,
          password: password.value,
          // eslint-disable-next-line
          password_confirmation: passwordConfirm.value,
        });
      },
    };
  },
});
</script>

<style scoped></style>
