<template>
  <div class="card">
    <div class="card-title">
      <h1 class="card-title__title">
        {{ plan }}
      </h1>
    </div>

    <div class="card-subtitle">
      <h2 class="card-title__subtitle">
        {{ price }}$
      </h2>
    </div>

    <div
      v-if="button"
      class="paypal-button"
    >
      <v-btn
        class="paypal-button__button"
        color="primary"
        @click="onPayment"
      >
        Comprar
      </v-btn>
    </div>

    <div class="card-body">
      <ul class="card-body__list">
        <li
          v-for="element in planList"
          :key="element"
        >
          <v-icon
            color="#26c281"
          >
            mdi-check-bold
          </v-icon>
          <span>
            {{ element }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlanCard',
    props: ['plan', 'price', 'planList', 'button'],
    methods: {
      onPayment: function () {
        this.$router.push({ name: 'Payment', params: { plan: this.plan } })
      },
    },
  }
</script>

<style scoped>
.card {
    min-width: 320px;
    display: flex;
    height: 690px;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    -webkit-box-shadow: 0px 1px 10px -3px #000000;
    box-shadow: 0px 1px 10px -3px #000000;
}

.card-title {
    margin: 20px;
}

.card-title__title {
    font-size: 40px;
    font-weight: bolder;
}

.card .paypal-button {
    margin: 20px;
}

.card .card-body {
    margin: 0px 0px 20px 0px;
    width: 100%;
    height: 100%;
}

.card .card-body .card-body__list {
    list-style: none;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
}

.card .card-body .card-body__list li {
    font-size: 16x;
    margin: 20px 10px;
}

</style>
