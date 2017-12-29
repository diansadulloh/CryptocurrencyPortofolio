<template>
  <b-row>
    <b-col
      sm="6"
      lg="3"
      v-for="item in items"
      :key="item.id">
      <portfolio-card
        :item="item"
        :currency-data="currencyData[item.id]"/>
    </b-col>
  </b-row><!--/.row-->
</template>

<script>
import PortfolioCard from '../components/PortfolioCard.vue';

export default {
  name: 'PortfolioCards',
  components: { PortfolioCard },
  props: {
    items: {
      type: Object,
      default: () => { return []; }
    },
    currencyData: {
      type: Object,
      default: () => { return {}; }
    }
  },
  data: () => {
    return {};
  }
};
</script>
