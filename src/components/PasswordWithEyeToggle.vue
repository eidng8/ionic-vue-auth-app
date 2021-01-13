<!--
  - GPLv3  https://www.gnu.org/licenses/gpl-3.0-standalone.html
  -
  - author eidng8
  -
  -->

<template>
  <ion-input
    clearInput
    ref="field"
    type="password"
    :name="name"
    :required="required"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.currentTarget?.value)"
  >
  </ion-input>
  <ion-icon
    color="medium"
    size="small"
    slot="end"
    :icon="secured ? eye : eyeOff"
    @click="toggleSecured($event)"
  ></ion-icon>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from 'vue';
import { IonIcon, IonInput } from '@ionic/vue';
import { eye, eyeOff } from 'ionicons/icons';

export default defineComponent({
  name: 'password-with-eye-toggle',
  components: {
    IonIcon,
    IonInput,
  },
  emits: ['update:modelValue'],
  props: {
    name: String,
    required: Boolean,
    modelValue: String,
    placeholder: { type: String, default: undefined },
  },
  setup() {
    const field = ref<ComponentPublicInstance<HTMLInputElement>>();
    const secured = ref(true);

    return {
      eye,
      eyeOff,
      field,
      secured,
      toggleSecured(evt: Event) {
        evt.stopImmediatePropagation();
        secured.value = !secured.value;
        if (field.value) {
          field.value.$el.type = secured.value ? 'password' : 'text';
        }
      },
    };
  },
});
</script>

<style scoped>
ion-icon {
  align-self: flex-end;
  margin-bottom: 12px;
}
</style>
