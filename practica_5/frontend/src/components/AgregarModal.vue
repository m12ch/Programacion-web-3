<template>
  <div class="medicamento-container">
    <el-button type="primary" plain @click="dialogFormVisible = true" class="add-button">
      <el-icon><plus /></el-icon> Agregar nuevo medicamento
    </el-button>
    
    <el-dialog 
      v-model="dialogFormVisible" 
      title="Agregar medicamento" 
      width="500"
      class="medicamento-dialog"
    >
      <el-form 
        :model="form" 
        @submit.prevent="EnviarMedicamento()"
        label-position="top"
      >
        <el-form-item 
          label="Nombre:" 
          :label-width="formLabelWidth"
          class="form-item"
        >
          <el-input 
            v-model="form.nombre" 
            autocomplete="off" 
            placeholder="Ej: Paracetamol 500mg"
            clearable
          />
        </el-form-item>
        
        <el-form-item 
          label="Precio:" 
          :label-width="formLabelWidth"
          class="form-item"
        >
          <el-input 
            v-model="form.precio" 
            autocomplete="off" 
            placeholder="Ej: 12.50"
            clearable
          >
            <template #append>S/.</template>
          </el-input>
        </el-form-item>
        
        <el-form-item 
          label="Stock:" 
          :label-width="formLabelWidth"
          class="form-item"
        >
          <el-input-number 
            v-model="form.stock" 
            :min="0" 
            controls-position="right"
          />
        </el-form-item>
        
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false" class="cancel-btn">
            Cancelar
          </el-button>
          <el-button 
            type="primary" 
            native-type="submit"
            class="submit-btn"
            :loading="loading"
          >
            Confirmar
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { AgregarMedicamento } from '../api/apis.js';
import { useToast } from "vue-toastification";

const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const loading = ref(false);
const emit = defineEmits(['medicamento-agregado']);
const toast = useToast();

const form = reactive({
  nombre: '',
  precio: '',
  stock: ''
});

const EnviarMedicamento = async () => {
  try {
    loading.value = true;
    const data = {
      ...form,
      precio: parseFloat(form.precio),
      stock: Number(form.stock)
    };
    
    await AgregarMedicamento(data);
    dialogFormVisible.value = false;
    emit('medicamento-agregado');
    
    toast.success("Medicamento agregado correctamente", {
      position: "top-center",
      timeout: 3000,
    });
    
    // Reset form
    form.nombre = '';
    form.precio = '';
    form.stock = '';
    
  } catch (error) {
    toast.error("Error al agregar medicamento", {
      position: "top-center",
      timeout: 3000,
    });
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.medicamento-container {
  margin: 20px 0;
}

.add-button {
  transition: all 0.3s ease;
  font-weight: 600;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.2);
}

.medicamento-dialog {
  border-radius: 12px;
}

.medicamento-dialog :deep(.el-dialog__header) {
  border-bottom: 1px solid #eee;
  margin-right: 0;
}

.medicamento-dialog :deep(.el-dialog__body) {
  padding: 20px 25px;
}

.form-item {
  margin-bottom: 22px;
}

.form-item :deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
  margin-bottom: 8px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.cancel-btn {
  transition: all 0.2s;
}

.cancel-btn:hover {
  color: var(--el-color-primary);
  border-color: var(--el-color-primary-light-5);
}

.submit-btn {
  transition: all 0.2s;
}

/* Responsive */
@media (max-width: 600px) {
  .medicamento-dialog {
    width: 90% !important;
  }
  
  .form-item {
    margin-bottom: 18px;
  }
}
</style>