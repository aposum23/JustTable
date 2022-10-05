<template>
  <div class="table-menu">
    <div>
      <div class="filter">
        <label for="filter-column" class="label">Имя колонки</label>
        <select v-on:change="setNullMeaning()" v-model="filterColumn" name="filter-column" class="drop-list">
          <option selected value=""></option>
          <option value="date_field">Дата</option>
          <option value="name_field">Название</option>
          <option value="number_field">Количество</option>
          <option value="distance_field">Расстояние</option>
        </select>
      </div>
      <div class="filter">
        <label for="type-of-comparison" class="label">Тип сравнения</label>
        <select v-on:change="getInformation2()" v-model="typeOfComparison" name="type-of-comparison" class="drop-list">
          <option selected value=""></option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value="<=">&le;</option>
          <option value=">=">&ge;</option>
          <option value="<>">&ne;</option>
          <option value="=">=</option>
        </select>
      </div>
      <div v-on:change="getInformation()" class="filter-2">
        <label for="comparison-value" class="label">Значение</label>
        <input type="text" name="comparison-alue" class="text-field" v-model="comparisonValue"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableMenu',
  data(){
    return{
      filterColumn: '',
      typeOfComparison: '',
      comparisonValue: '',
    }
  },
  methods:{
    getInformation(){
      if (this.filterColumn !== '' && this.typeOfComparison !== '' && this.comparisonValue !== ''){
        let value = this.comparisonValue;
        if (this.comparisonValue.indexOf('-') !== -1){
          value = new Date(this.comparisonValue + ' 21:00:00');
        }
        if (this.filterColumn === 'date_field' && typeof(value) !== 'string' || this.filterColumn !== 'date_field'){
          this.$emit('reloadList', [this.filterColumn, this.typeOfComparison, value]);
        }
      }
    },
    setNullMeaning(){
      this.typeOfComparison = '';
      this.comparisonValue = '';
    }
  }
}
</script>

<style scoped>
  .table-menu{
    background-color: #BBDFC5;
    border-radius: 16px;
    display: run-in;
    padding: 1rem;
  }
  .label{
    margin: 0rem .5rem;
  }
  .filter{
    width: 250px;
    display: inline-block;
  }
  .filter-2{
    width: 350px;
    display: inline-block;
  }
  .drop-list{
    border:0px;
    border-radius: 16px;
    width: 7rem;
    padding: .3rem;
    text-align: center;
  }
  .text-field{
    border:0px;
    border-radius: 16px;
    width: 15rem;
    padding: .3rem;
  }
</style>
