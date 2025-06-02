<template>
    <el-table :data="medicamentos" style="width: 100%" height="250">
      <el-table-column fixed prop="id_medicamento" label="id_medicamento" width="150" />
      <el-table-column prop="nombre" label="Nombre" width="120" />
      <el-table-column prop="precio" label="Precio" width="120" />
      <el-table-column prop="stock" label="Stock" width="320" />
      <el-table-column  label="Acciones" width="320" >
          <template #default="scoped">
             <el-button type="primary"  :icon="Edit" @click="MostrarInput(scoped.row)" circle />
             <el-button type="danger" :icon="Delete" @click="EliminarMedicamento(scoped.row.id_medicamento)" circle />
          </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="Editar medicamento" width="500">
    <el-form :model="form" >
      <el-form-item label="Nombre: " :label-width="formLabelWidth">
        <el-input v-model="form.nombre" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Precio: " :label-width="formLabelWidth">
        <el-input v-model="form.precio" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Stock: " :label-width="formLabelWidth">
        <el-input v-model="form.stock" autocomplete="off" />
      </el-form-item>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="ActualizarMedicamento()">
          Confirmar
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import {ActualizarMedicamentos, EliminarMedicamentos, getMedicamentos} from '../api/apis.js';
import {ref,onMounted,reactive} from 'vue';
import { useToast } from "vue-toastification";
import {
  Delete,
  Edit
} from '@element-plus/icons-vue'
const toast = useToast();
const medicamentos=ref([]);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const form = reactive({
 id_medicamento:null,
 nombre:'',
 precio:'',
 stock:''
})
const TablaMedicamentos=  async () => {
    try{
        const resultado = await getMedicamentos();
        medicamentos.value = resultado;
    }catch(error){
        console.error(error);
    }
}
const MostrarInput = async(medicamento)=>{
  try{
      form.id_medicamento=medicamento.id_medicamento;
      form.nombre=medicamento.nombre;
      form.precio=medicamento.precio;
      form.stock=medicamento.stock;
      dialogFormVisible.value=true;
  }catch(error){
    console.error(error)

  }
}

const ActualizarMedicamento=async()=>{
  try{
     const data={
       id_medicamento:form.id_medicamento,
       nombre:form.nombre,
       precio:Number(form.precio),
       stock:parseFloat(form.stock)
     }

    await ActualizarMedicamentos(data);
    dialogFormVisible.value=false;
    await TablaMedicamentos();
    toast.success("Se actualizo correctamente",{
      position: "top-right",
      timeout: 3000,
    })
  }catch(error){
    console.error(error);
  }
}
const EliminarMedicamento=async(id_medicamento)=>{

  ElMessageBox.confirm(
    'Estas seguro que deseas eliminar este medicamento?',
    'Eliminar',
    {
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    }
  )
    .then(async() => {
      await EliminarMedicamentos(id_medicamento);
      await TablaMedicamentos()
          toast.success("Se Elimino correctamente",{
          position: "top-left",
          timeout: 3000,
        })
    })
    
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminar cancelado',
      })
    })
}
onMounted(TablaMedicamentos)
defineExpose({ TablaMedicamentos })
</script>
<style scoped>
.el-table {
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.el-table th {
  background-color: #f5f7fa;
  font-weight: bold;
  color: #606266;
}

.el-table td {
  font-size: 14px;
}

.el-button {
  transition: all 0.2s ease;
}

.el-button:hover {
  transform: scale(1.05);
}

/* Diálogo de edición */
.el-dialog {
  border-radius: 12px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.el-form-item {
  margin-bottom: 22px;
}

.el-form-item .el-form-item__label {
  font-weight: 500;
  color: #606266;
  margin-bottom: 8px;
}

/* Responsive */
@media (max-width: 600px) {
  .el-dialog {
    width: 90% !important;
  }

  .el-form-item {
    margin-bottom: 18px;
  }

  .el-button {
    width: 100%;
  }
}
</style>
