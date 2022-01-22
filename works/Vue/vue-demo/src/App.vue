<template>
  <div id="app">
    <h1>Vue-router</h1>
    <div id="nav">
      <!-- 自动适用history和hash模式:如果是使用history自动加/,如果使用hash自动加# -->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <hr/>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
</style>
