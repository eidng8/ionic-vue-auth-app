<!--
  - GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
  -
  - author eidng8
  -
  -->

<template>
  <ion-card>
    <ion-card-content>
      <ion-list>
        <ion-item lines="none">
          <ion-button
            color="success"
            size="block"
            slot="start"
            @click.prevent.stop="refresh"
          >
            Refresh
          </ion-button>
          <ion-button
            color="danger"
            size="block"
            slot="end"
            @click.prevent.stop="logout"
          >
            Logout
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonList,
} from '@ionic/vue';
import { AllActions, store } from '@/store';

export default defineComponent({
  name: 'TokenBox',
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonItem,
    IonList,
  },
  setup() {
    // heartbeat every second
    let timer = -1;
    onBeforeMount(() => {
      timer = window.setInterval(
        () => store.dispatch(AllActions.heartbeat),
        1000,
      );
    });
    onBeforeUnmount(() => {
      if (timer != -1) {
        window.clearInterval(timer);
        timer = -1;
      }
    });

    return {
      refresh: () => store.dispatch(AllActions.refresh),
      logout: () => store.dispatch(AllActions.logout),
    };
  },
});
</script>

<style scoped></style>
