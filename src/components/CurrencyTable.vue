<template>
  <b-card :header="caption">
    <b-row class="currency-table-control-row">
      <b-col
        md="6"
        class="">
        <b-form-group
          horizontal
          label="Filter"
          class="mb-0">
          <b-input-group>
            <b-form-input
              v-model="filter"
              placeholder="Type to Search"/>
            <b-input-group-button>
              <b-btn
                :disabled="!filter"
                @click="filter = ''">Clear
              </b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col
        md="6"
        class="">
        <b-form-group
          horizontal
          label="Per page"
          class="mb-0">
          <b-form-select
            :options="pageOptions"
            v-model="perPage"/>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table
      :hover="hover"
      :striped="striped"
      :bordered="bordered"
      :small="small"
      :fixed="fixed"
      class="table-responsive-sm"
      :items="items"
      :fields="fields"
      :filter="filter"
      :current-page="currentPage"
      :per-page="perPage"
      @filtered="onFiltered"
    >
      <template
        slot="percent_change_7d"
        slot-scope="data">
        <b-badge :variant="getPercentageBadge(data.item.percent_change_7d)">
          {{ data.item.percent_change_7d }}
        </b-badge>
      </template>
    </b-table>
    <nav>
      <b-pagination
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
      />
    </nav>
  </b-card>
</template>

<script>

export default {
  name: 'Table',
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => { return []; }
    }
  },
  data: () => {
    return {
      fields: [
        {
          key: 'rank',
          sortable: true
        },
        {
          key: 'symbol',
          sortable: true
        },
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'available_supply',
          sortable: true
        },
        {
          key: 'price_usd',
          sortable: true,
          label: 'Price (&dollar;)'
        },
        {
          key: 'market_cap_usd',
          label: 'Market Cap (&dollar;)'
        },
        {
          key: 'percent_change_7d',
          label: '% Change (7d)'
        }
      ],
      currentPage: 1,
      perPage: 20,
      totalRows: 0,
      filter: null,
      pageOptions: [10, 20, 50]
    };
  },
  methods: {
    getPercentageBadge(percentage) {
      if (typeof percentage === 'string') {
        return percentage[0] === '-' ? 'danger' : 'success';
      }
      if (typeof percentage === 'number') {
        return percentage < 0 ? 'warning' : 'success';
      }

      return 'primary';
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style>
  .currency-table-control-row {
    margin-bottom: 1em;
  }
</style>
