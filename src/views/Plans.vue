<template>
  <div class="plans-container">
    <plan-card
      plan="Basico"
      price="220"
      :plan-list="['3 Revisiones', 'Base de datos', 'Diseño de sitio web', 'Hosting', 'Dominio', 'Certificado SSL', 'Soporte']"
      button="true"
    />
    <plan-card
      plan="Intermedio"
      price="320"
      :plan-list="['5 Revisiones', 'Mismo contenido de plan basico', 'SEO optimizado']"
      button="true"
    />
    <plan-card
      plan="Profesional"
      price="420"
      button="true"
      :plan-list="['7 Revisiones', 'Mismo contenido de plan intermedio', 'Integración de redes sociales', 'Integración de Google Analytics']"
    />
  </div>
</template>

<script>
  import PlanCard from '../components/PlanCard.vue'
  export default {
    name: 'PlansView',
    components: {
      PlanCard,
    },
  }
</script>

<style scoped>
.plans-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding-top: 50px
}

</style>
