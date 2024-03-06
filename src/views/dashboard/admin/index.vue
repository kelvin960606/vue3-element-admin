<template>
  <div class="dashboard-editor-container">
    <div v-if="statsData != null && statsData.statistic != null">
      <panel-group :data="[{
      text: 'direct_user_nums',
      count: statsData.statistic.direct_user_nums,
    }, {
      text: 'direct_child_nums',
      count: statsData.statistic.direct_child_nums
    }, {
      text: 'total_user_nums',
      count: statsData.statistic.total_user_nums
    }, {
      text: 'deposits',
      count: statsData.statistic.deposits
    },
    {
      text: 'withdraws',
      count: statsData.statistic.withdraws,
    }, {
      text: 'bets',
      count: statsData.statistic.bets
    }, {
      text: 'wins',
      count: statsData.statistic.wins
    }, {
      text: 'bonuss',
      count: statsData.statistic.bonuss
    }, {
      text: 'rebates',
      count: statsData.statistic.rebates,
    }, {
      text: 'integral_bonuss',
      count: statsData.statistic.integral_bonuss
    }, {
      text: 'commissions',
      count: statsData.statistic.commissions
    }, {
      text: 'gross_incomes',
      count: statsData.statistic.gross_incomes
    }, {
      text: 'net_incomes',
      count: statsData.statistic.net_incomes
    },
    ]" />
    </div>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup';
import { defineComponent } from 'vue';
import { getDashboard } from '@/api/app';


export default defineComponent({
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
  },
  data() {
    return {
      statsData: {},
    };
  },
  created() {
    this.getDashboardData();
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    getDashboardData() {
      getDashboard().then(res => {
        this.statsData = res.data;
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
