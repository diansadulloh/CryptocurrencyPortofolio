<template>
  <div>
    <b-form v-if="show">
      <b-form-group
        id="currencyGroup"
        label="Currency of item:"
        label-for="currency">
        <b-form-select
          id="currency"
          :options="cryptoCurrencyList"
          required
          v-model="form.id"
          @input="isAlreadyInPortfolio"/>
      </b-form-group>
      <div v-if="showDuplicateWarning">
        <b-alert
          variant="warning"
          show>This currency is already in your portfolio,
          setting a value here will overwrite the current value.
        </b-alert>
      </div>
      <b-form-group
        id="valueGroup"
        label="Value:"
        label-for="value">
        <b-form-input
          id="value"
          type="number"
          v-model="form.value"
          required
          placeholder="Enter value"/>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'PortfolioAddItemForm',
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          id: '',
          value: ''
        };
      }
    },
    cryptoCurrencyList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    portfolio: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data: () => {
    return {
      show: true,
      showDuplicateWarning: false
    };
  },
  methods: {
    isAlreadyInPortfolio(value) {
      this.showDuplicateWarning = this.portfolio[value] !== undefined;
    }
  }
};
</script>
