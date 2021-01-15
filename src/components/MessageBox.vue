<!--
  - GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
  -
  - author eidng8
  -
  -->

<template>
  <div class="ion-margin-horizontal box-container">
    <!-- Though we can use plugins such as vue-pluralize.
     --- I'll try to minize dependencies. -->
    <p v-if="length > 1">{{ length }} messages</p>
    <p v-else>{{ length }} message</p>

    <!-- List of messages -->
    <div ref="box">
      <pre v-for="(message, idx) in messages" :key="idx">{{ message }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { AuthState, Store } from '@/store';

export default defineComponent({
  name: 'MessageBox',
  setup() {
    const box = ref<HTMLDivElement>();
    const store: Store = useStore<AuthState>();

    return {
      box,
      length: computed<number>(() => {
        window.setTimeout(() => {
          const count = box.value?.childElementCount || 1;
          const last = box.value?.children[count - 1];
          if (last) last.scrollIntoView();
        }, 100);
        return store.getters.messages.length;
      }),
      messages: computed<string[]>(() => store.getters.messages),
    };
  },
});
</script>

<style scoped>
.box-container {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  flex: 1 1 auto !important;
}

.box-container > p {
  flex: 0 0 auto;
}

.box-container > div {
  flex: 1 auto;
  overflow: auto;
}

pre {
  width: 100%;
  color: var(--ion-color-medium);
  overflow: auto;
}
</style>
