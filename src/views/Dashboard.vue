<template>
  <div class="animated fadeIn">
    <currency-table
      hover
      striped
      bordered
      small
      fixed
      caption="Current Market Conditions"
      :items="currencyData"/>
  </div>
</template>

<script>
import CurrencyTable from '../components/CurrencyTable.vue';
import axios from 'axios';

export default {
  name: 'Dashboard',
  components: { CurrencyTable },
  data: () => {
    return { currencyData: [] };
  },
  created: function created() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0')
      .then(response => {
        this.currencyData = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>
