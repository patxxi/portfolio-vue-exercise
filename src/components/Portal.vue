<template>
  <div class="modal-backdrop">
    <div class="modal">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppModal',

  }
</script>

<style scoped>
.portal{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
.modal-body {
    position: relative;
    padding: 20px 10px;
  }

</style>
