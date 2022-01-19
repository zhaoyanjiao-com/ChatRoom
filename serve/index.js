const Ws = require('ws') //在node服务中建立 ws服务

;((Ws) => {
  const server = new Ws.Server({port: 8000}) //开启8000端口

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    //使用on 给服务去绑定事件
    server.on('open', handleOpen);
    server.on('close', handleClose);
    server.on('error', handleError);
    server.on('connection', handleConnection);
  }

  function handleOpen() {
    console.log('Open')
  }

  function handleClose() {
    console.log('Close')
  }

  function handleError() {
    console.log('Error')
  }

  function handleConnection(ws) {
    //连接成功触发message函数
    ws.on('message', handleMessage)
  }

  //这里的参数就是前端传递过来的值
  function handleMessage(msg) {
    //toString()将16进制的转化为中文
    // console.log(msg.toString())
    //在这里在将信息广播给所有客户端
    server.clients.forEach(i => {
      // 每一个客户端都发送信息
      i.send(msg.toString())
    })
  }

  init()
})(Ws)
