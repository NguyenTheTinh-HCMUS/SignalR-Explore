using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Signalr.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Signalr.Controllers
{
    public class AnnouncementController : Controller
    {
        private readonly IHubContext<MessageHub> _hubContext;

        public AnnouncementController(IHubContext<MessageHub> hubContext)
        {
            _hubContext = hubContext;

        }
        [HttpGet("/announcement")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
