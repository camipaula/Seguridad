using IntentoPW.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace IntentoPW.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult QuienesSomos()
        {
            ViewData["Title"] = "Quiénes Somos";
            return View();
        }

        public IActionResult Servicioss()
        {
            ViewData["Title"] = "Servicios";
            return View();
        }

        public IActionResult Gestion()
        {
            ViewData["Title"] = "Gestión";
            return View();
        }

        public IActionResult BolsaEmpleo()
        {
            ViewData["Title"] = "Bolsa de Empleo";
            return View();
        }

        public IActionResult Contacto()
        {
            ViewData["Title"] = "Contacto";
            return View();
        }
    }



}
