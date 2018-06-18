<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.card {
  border:1px solid salmon;
  width: 100vw;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
