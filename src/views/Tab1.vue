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
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="page-content">
        <login-form v-if="!loggedIn"></login-form>
        <message-box></message-box>
        <token-box v-if="loggedIn"></token-box>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { hasToken } from '@/services/http';
import { AuthState, Store } from '@/store';
import LoginForm from '@/components/LoginForm.vue';
import MessageBox from '@/components/MessageBox.vue';
import TokenBox from '@/components/TokenBox.vue';

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
    TokenBox,
  },
  setup() {
    const store: Store = useStore<AuthState>();

    return {
      loggedIn: computed<boolean>(() => hasToken(store.getters.token)),
    };
  },
});
</script>

<style scoped>
.page-content {
  width: 100%;
  height: calc(100% - 10px);
  display: flex;
  flex-direction: column;
}

.page-content > * {
  flex: 0 0 auto;
}
</style>
