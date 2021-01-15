<!--
  - GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
  -
  - author eidng8
  -
  -->

<template>
  <div class="ion-margin-horizontal">
    <p v-for="(message, idx) in messages" :key="idx">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { AuthState, Store } from '@/store';

export default defineComponent({
  name: 'MessageBox',
  setup() {
    const store: Store = useStore<AuthState>();
    return {
      messages: computed<string[]>(() => store.getters.messages),
    };
  },
});
</script>

<style scoped>
p {
  color: var(--ion-color-medium);
  overflow: auto;
}
</style>
