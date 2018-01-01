<template>
  <b-card :no-body="true">
    <b-card-body class="p-3 clearfix">
      <img
        :src="`https://files.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`"
        class="mr-3 float-left">
      <div class="h5 text-primary mb-0 mt-2">
        <span class="text-uppercase">{{ currencyData.localSymbol }}</span>
        {{ valueInLocalCurrency() }}
      </div>
      <b-button
        type="button"
        variant="outline-primary"
        class="float-right small"
        @click="editItem"><i class="fa fa-pencil"/></b-button>
      <div
        class="text-muted font-weight-bold font-xs"
        v-if="currencyData.localSymbol !== 'usd'">
        USD {{ valueInUSD() }}
      </div>
      <div class="text-primary font-weight-bold font-xs">
        {{ item.value }} {{ item.id }}
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import eventHub from '../eventHub';

function formatCurrencyValue(value) {
  if (isNaN(value)) {
    return '-';
  }

  return Number(Math.round(value + 'e2') + 'e-2');
}

export default {
  name: 'PortfolioCard',
  props: {
    item: {
      type: Object,
      default: () => { return {}; }
    },
    currencyData: {
      type: Object,
      default: () => { return {}; }
    }
  },
  data: () => {
    return {};
  },
  methods: {
    valueInLocalCurrency() {
      return formatCurrencyValue(this.currencyData.localPrice * this.item.value);
    },
    valueInUSD() {
      return formatCurrencyValue(this.currencyData.price_usd * this.item.value);
    },
    editItem() {
      eventHub.$emit('edit-portfolio-item', this.item);
    }
  }
};
</script>
