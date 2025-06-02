

<template>
  <Agregar @medicamento-agregado="actualizar"/>
  <Listado ref="medicamento"/>
</template>
<script setup>
import Listado from './components/ListadoMedicamento.vue';
import Agregar  from './components/AgregarModal.vue';
import {ref} from 'vue';

const medicamento=ref(null);
const actualizar=()=>{
  medicamento.value?.TablaMedicamentos();
}

</script>

<style scoped>

</style>
