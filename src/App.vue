<template>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <div id="app">
    <BingoCard />
  </div>
</template>

<script>
import BingoCard from './components/BingoCard.vue'

export default {
  name: 'App',
  components: {
    BingoCard,
  },
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1a1a 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 0;
}

#app {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
