<template>
  <div>
    <div class="plans-container">
      <div v-if="!paidFor && !error">
        <plan-card
          v-if="plan === 'Basico'"
          plan="Basico"
          price="220"
          :plan-list="['3 Revisiones', 'Base de datos', 'Diseño de sitio web', 'Hosting', 'Dominio', 'Certificado SSL', 'Soporte']"
        />
        <plan-card
          v-else-if="plan === 'Intermedio'"
          plan="Intermedio"
          price="320"
          :plan-list="['5 Revisiones', 'Mismo contenido de plan basico', 'SEO optimizado']"
        />
        <plan-card
          v-else-if="plan === 'Profesional'"
          plan="Profesional"
          price="420"
          :plan-list="['7 Revisiones', 'Mismo contenido de plan intermedio', 'Integración de redes sociales', 'Integración de Google Analytics']"
        />
      </div>

      <div v-if="paidFor">
        <iframe
          src="https://giphy.com/embed/yeYaI0wAgWDKjZhHY5"
          width="480"
          height="352"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        />
      </div>

      <div v-if="error">
        <iframe
          src="https://giphy.com/embed/zPOErRpLtHWbm"
          width="470"
          height="480"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        />
      </div>
      <div ref="paypal" />
    </div>
  </div>
</template>

<script>

  import PlanCard from '../components/PlanCard.vue'
  // import image from "../assets/lamp.png"
  export default {
    name: 'PaymentView',
    components: {
      PlanCard,
    },
    data: function () {
      return {
        loaded: false,
        paidFor: false,
        error: false,
        product: {
          price: 777.77,
          description: 'leg lamp from that one movie',
          img: './assets/lamp.jpg',
        },
        plan: '',
      }
    },
    mounted: function () {
      const script = document.createElement('script')
      script.src =
        'https://www.paypal.com/sdk/js?client-id=Af18W3waxre4G4IgFSsagKNC4zhAQ1X5dj1EkLdWNlaBK2WTl0DHanPPXiQ6jxPIIbY_5q5lc8e5x285'
      script.addEventListener('load', this.setLoaded)
      document.body.appendChild(script)

      console.log(this.$route.params)
      this.plan = this.$route.params.plan
    },
    methods: {
      setLoaded: function () {
        this.loaded = true
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: this.product.description,
                    amount: {
                      currency_code: 'USD',
                      value: this.product.price,
                    },
                  },
                ],
              })
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture()
              this.paidFor = true
              console.log(order)
            },
            onError: err => {
              console.log(err)
              this.error = true
            },
          })
          .render(this.$refs.paypal)
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.card {
    width: 320px;
    display: flex;
    height: 690px;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    -webkit-box-shadow: 0px 1px 10px -3px #000000;
    box-shadow: 0px 1px 10px -3px #000000;
    margin-bottom: 30px;
}
.plans-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 50px
}
</style>
