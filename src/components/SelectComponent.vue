<template>
  <div>
    <select class="form-select" v-model="selectedOption" :required="required">
      <option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }, 
  required: {
    type: Boolean,
    default: true
  }, 
  options: {
    type: Array,
    required: true,
    default: () => []
  },
});

const emit = defineEmits(['update:modelValue']);
const selectedOption = ref(props.modelValue);

// Observa cambios en `selectedOption` y emite al componente padre
watch(selectedOption, (newValue) => {
  emit('update:modelValue', newValue);
});

// Observa cambios en `props.modelValue` y actualiza `selectedOption`
watch(() => props.modelValue, (newValue) => {
  selectedOption.value = newValue;
});
</script>

<style scoped>
.form-select {
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
}
</style>
