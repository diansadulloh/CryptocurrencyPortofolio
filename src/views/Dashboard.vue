<template>
  <div class="animated fadeIn">
    <b-alert
      show
      variant="danger"
      v-if="errors.length > 0">{{ errors[0] }}
    </b-alert>
    <b-alert
      show
      v-if="loading === true">Loading currency data from API...
    </b-alert>
    <currency-table
      v-if="loading === false"
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
    return {
      currencyData: [],
      errors: [],
      loading: true
    };
  },
  created: function created() {
    this.loading = true;
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0')
      .then(response => {
        this.currencyData = response.data;
        this.loading = false;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>
