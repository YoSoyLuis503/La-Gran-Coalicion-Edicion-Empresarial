<template>
    <div>
      <input 
        :placeholder="placeholder" 
        :type="type" 
        :required="required" 
        class="form-control" 
        v-model="inputValue"
        @input="updateValue"
      />
      <br>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits  } from 'vue';
  
  // Definimos las propiedades del componente
  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Ingrese texto' // Placeholder por defecto
    },
    type: {
      type: String,
      default: 'text' // Tipo de input por defecto es 'text'
    },
    required: {
      type: Boolean,
      default: true // El input es requerido por defecto
    },
    modelValue: {
      type: [String, Number],
      default: '' // Valor inicial del input
    }
  });
  
  // Definimos el valor del input usando 'ref'
  const inputValue = ref(props.modelValue);
  
  // Emitimos el valor actualizado del input al padre
  const emit = defineEmits(['update:modelValue']);
  const updateValue = () => {
    emit('update:modelValue', inputValue.value);
  };
  </script>
  
  <style scoped>
  .form-control {
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
  }
  </style>
  