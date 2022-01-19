<template>
  <div class="home">
    <ul>
      <li v-for="item in dataList">
        <span>{{item.name}}</span>
        <span>{{item.id}}</span>
        <span>{{item.dateTime}}</span>
        <p>消息：{{item.value}}</p>
      </li>
    </ul>
    <input type="text" v-model="value">
    <button @click="handleWssend">发送</button>
  </div>
</template>

<script>
  // 使用websocket,前端就要挂载 ws的4个方法   (_在这里写的ws代码 都可以封装出来)
  const ws = new WebSocket('ws://localhost:8000')

  export default {
    name: 'Home',
    data() {
      return {
        value: '',
        dataList: []
      }
    },
    mounted() {
      ws.addEventListener('open', this.handleWsopen, false)
      ws.addEventListener('close', this.handleWsclose, false)
      ws.addEventListener('error', this.handleWserror, false)
      ws.addEventListener('message', this.handleWsmessage, false)
    },
    methods: {
      handleWssend() {
        let newvalue = this.value
        if (!newvalue.trim().length) return

        //这里是将前端数据发送给后端
        ws.send(JSON.stringify({
          value: this.value,
          id: new Date().getTime(),
          dateTime: new Date().getTime(),
          name: localStorage.getItem('name')
        }))
        this.value = ''
      },
      //这是ws中的4个事件
      handleWsopen(e) {
        console.log('open-建立了连接', e)
      },
      handleWsclose(e) {
        console.log('close-关闭了连接', e)
      },
      handleWserror(e) {
        console.log('error-连接错误', e)
      },
      //这里就可以接收后端广播出来的信息
      handleWsmessage(e) {
        this.dataList.push(JSON.parse(e.data))
      },
    }
  }
</script>
