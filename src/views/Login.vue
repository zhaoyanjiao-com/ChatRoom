<template>
  <div class="about">
    <input type="text" v-model="value" placeholder="输入名称">
    <button @click="getInto">进入聊天室</button>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        value: ''
      }
    },
    methods: {
      getInto() {
        if (!this.value) return
        localStorage.setItem('name', this.value)
        this.$router.push('/')
      }
    }
  }
</script>
