"use strict";
var connecction = new signalR.HubConnectionBuilder()
    .withUrl("/messages")
    .build();

connecction.on("ReceiveMessage", function (message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var div = document.createElement("div");
    div.innerHTML = msg + "<hr />"
    document.getElementById("messages").appendChild(div);
});
connecction.start().catch(err => {
    console.error(err);
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("message").value;
    var groupElement = document.getElementById("group");
    var groupValue = groupElement.options[groupElement.selectedIndex].value;
    if (groupValue == "Mysefl" || groupValue == "All") {
        var method = groupValue == "Mysefl" ? "SendMessageToCaller" : "SendMessageToAll";
        connecction.invoke(method, message)
            .catch(function (err) {
                return console.error(err)
            });
    }
    else if (groupValue == "PrivateGroup") {
        connecction.invoke("SendMessageToGroup", groupValue, message)
            .catch(function (err) {
                return console.error(err);
            });
    }
    else {
        connecction.invoke("SendMessageToUser", groupValue, message)
            .catch(function (err) {
                return console.error(err);
            });
    }
  
    event.preventDefault();
})


connecction.on("UserConnected", function (connectionId) {
    var groupElement = document.getElementById("group");
    var option = document.createElement("option");
    console.log("user Connect")

    option.text = connectionId;
    option.value = connectionId;
    groupElement.add(option);
    
})
connecction.on("UserDisConnected", function (connectionId) {
    var groupElement = document.getElementById("group");
    for (var i = 0; i < groupElement.length; i++) {
        if (groupElement.options[i].value == connectionId) {
            groupElement.remove(i);
        }
    }
})
document.getElementById("joinGroup").addEventListener("click", function (event) {
    connecction.invoke("JoinGroup", "PrivateGroup")
        .catch(function (err) {
            return console.error(err)
        })
    event.preventDefault()
})
