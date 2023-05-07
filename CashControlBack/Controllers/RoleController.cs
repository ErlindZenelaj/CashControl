using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using CashControlBack.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CashControlBack.Controllers
{
    public class RoleController : Controller
    {
 
        public IActionResult Index()
        {
            return View();
        }

        [Authorize(Policy = "RequireCompany")]
   
        public IActionResult Company()
        {
            return View();
        }

        [Authorize(Roles = $"{Constants.Roles.Administrator},{Constants.Roles.Company}")]

        public IActionResult Admin()
        {
            return View();
        }
    }
}

