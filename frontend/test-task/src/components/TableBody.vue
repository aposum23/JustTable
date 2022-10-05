<template>
  <div>
    <TableMenu v-on:reloadList="setFilters"/>
    <div class="table-body">
      <table>
        <tr>
          <th v-on:click="activateSorting('date_field')" class="date-h" :class="{active: sortingColumn == 'date_field'}">
            Дата<div v-if="sortingColumn == 'date_field'" class="arrow">
              <img src="@/assets/arrow.png" :class="{rotate: isRotate}"/>
            </div>
          </th>
          <th v-on:click="activateSorting('name_field')" class="title-h" :class="{active: sortingColumn == 'name_field'}">
            Название<div v-if="sortingColumn == 'name_field'" class="arrow">
              <img src="@/assets/arrow.png" :class="{rotate: isRotate}"/>
            </div>
          </th>
          <th v-on:click="activateSorting('number_field')" class="count-h" :class="{active: sortingColumn == 'number_field'}">
            Количество
            <div v-if="sortingColumn == 'number_field'" class="arrow">
              <img src="@/assets/arrow.png" :class="{rotate: isRotate}"/>
            </div>
          </th>
          <th v-on:click="activateSorting('distance_field')" class="distance-h" :class="{active: sortingColumn == 'distance_field'}">
            Расстояние
            <div v-if="sortingColumn == 'distance_field'" class="arrow">
              <img src="@/assets/arrow.png" :class="{rotate: isRotate}"/>
            </div>
          </th>
        </tr>
        <tr v-for="row in information[pageNum - 1]" :key="row.name_field">
          <td>{{row.date_field}}</td>
          <td>{{row.name_field}}</td>
          <td>{{row.number_field}}</td>
          <td>{{row.distance_field}}</td>
        </tr>
      </table>
      <div class="table-pagination">
        <div v-for="page in information" :key="page[0]" v-on:click="changePage(page[0])" class="page-number" :class="{page_active: pageNum === page[0]}">
          <p>{{page[0]}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TableMenu from './TableMenu.vue';

export default {
  name: 'TableBody',
  data(){
    return{
      information: null,
      sortingColumn: 'date_field',
      isRotate: false,
      sortingDirection: 'up',
      filterColumn: '',
      typeOfComparison: '',
      comparisonValue: '',
      pageNum: 1,
    }
  },
  components: {
    TableMenu,
},
  methods: {
    activateSorting(column){
      if (this.sortingColumn === column){
        this.isRotate = !this.isRotate;
        this.getInformation(['', '', '']);
      }
      else{
        this.sortingColumn = column;
        this.isRotate = false;
        this.getInformation();
      }
    },
    getInformation(){
      if (this.isRotate){
        this.sortingDirection = 'down';
      }
      else{
        this.sortingDirection = 'up';
      }
      let params = {
			sortingDirection: this.sortingDirection,
      sortingColumn: this.sortingColumn,
      filterColumn: this.filterColumn,
      typeOfComparison: this.typeOfComparison,
      comparisonValue: this.comparisonValue};
      axios.get(
        'http://192.168.0.108:3000/api/getInformation',
        params).then(response => (this.information = response.data));
    },
    changePage(num){
      this.pageNum = num;
    },
    setFilters(values){
      this.filterColumn = values[0];
      this.typeOfComparison = values[1];
      this.comparisonValue = values[2];
      this.getInformation();
    }
  },
  created:
    function(){
      this.getInformation();
    }
}
</script>

<style scoped>
  table{
    margin: 2rem auto;
    background-color: rgb(235, 235, 235);
    padding: 3rem;
    border-radius: 16px;
  }
  .arrow img{
    width: 1rem;
    height: 1rem;
  }
  .arrow{
    width: 1rem;
    height: 1rem;
    display: inline;
    margin-left: .5rem
  }
  .active{
    outline: 1px solid rgb(0, 0, 0);
  }
  .rotate{
    transform: rotate(180deg);
  }
  .date-h{
    width: 15rem;
  }
  .title-h{
    width: 20rem;
  }
  .count-h{
    width: 10rem;
  }
  .distance-h{
    width: 10rem;
  }
  th, td{
    height: 2rem;
  }
  .table-pagination{
    height: 20px;
  }
  .page-number{
    display: inline-block;
    margin: 0px 1rem;
    background-color: #BBDFC5;
    border-radius: 90px;
    width: 30px;
    height: 30px;
  }
  .page_active{
    padding: .1rem;
    background-color: #68aa7b;
  }
  p{
    margin: 7px 0px;
  }
</style>
