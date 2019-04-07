const ipc = require('electron').ipcRenderer;

const syncMsgBtn = document.getElementById('sendSyncMsgBtn');

syncMsgBtn.addEventListener('click', function(){
    const reply = ipc.sendSync('synchronous-message', "Mr. Watson, come here.");
    console.log(reply);
    const message = `Synchronous message reply: ${reply}`;
    document.getElementById('syncReply').innerHTML = message;
});


const asyncMsgBtn = document.getElementById('sendAsyncMsgBtn');

asyncMsgBtn.addEventListener('click', function(){
    ipc.send('asynchronous-message', 'That is one small step for man');
});

ipc.on('asynchronous-reply', function(event, arg){
    const message = `Asynchronous message reply: ${arg}`;
    document.getElementById('asyncReply').innerHTML = message;
});
