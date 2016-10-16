using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CouchTest.WebApi.Controllers
{
    public class FacebookCallbackController : Controller
    {
        // GET: FacebookCallback
        public ActionResult Index()
        {
            ViewBag.MustRegister = Request.Cookies[".AspNet.ExternalCookie"] != null ? 1 : 0;
            return View();
        }
    }
}