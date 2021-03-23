using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Signalr.Hubs
{
    public class MessageHub :Hub
    {
        public async Task SendMessageToAll(string message)
        {
            // send for everyclinet
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
        public async Task SendMessageToCaller(string message)
        {
            // send inviduale
            await Clients.Caller.SendAsync("ReceiveMessage", message);
        }
        public async Task SendMessageToUser(string connectionId,string message)
        {
           await  Clients.Client(connectionId).SendAsync("ReceiveMessage", message);
        }
        public async Task JoinGroup(string group)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, group);
        }
        public async Task SendMessageToGroup(string group,string message)
        {
            await Clients.Group(group).SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
             await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
             await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("UserDisConnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }


    }
}
