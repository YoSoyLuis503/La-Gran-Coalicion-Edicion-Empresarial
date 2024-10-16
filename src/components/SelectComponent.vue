<template>
  <div>
    <select class="form-select" v-model="selectedOption" :required="required">
      <option :disabled="true" :value="defaultOptionValue">{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.text }}</option>
    </select>
    <br>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';  // Importamos ref y watch
// Definir props usando defineProps
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Seleccionar opción'
  },
  required: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  defaultOptionValue: {
    type: String,
    default: ''
  }
});

// Definir emit usando defineEmits
const emit = defineEmits(['update:modelValue']);

// Definir la opción seleccionada con ref para usarla con v-model
const selectedOption = ref(props.modelValue);

// Observar cambios en la opción seleccionada y emitir el evento al padre
watch(selectedOption, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<style scoped>
.form-select {
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
}
</style>
