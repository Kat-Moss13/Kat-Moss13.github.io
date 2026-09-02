using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace KatMossPortfolio.Pages
{
    public class IndexModel : PageModel
    {
        public List<Project> Projects = [];

        public void OnGet()
        {
            Projects = new List<Project>
        {
            new Project { Title = "Project One", Image = "/images/project1.png", Page = "/Projects/Project1" },
            new Project { Title = "Project Two", Image = "/images/project2.jpg", Page = "/Projects/Project2" },
            new Project { Title = "Project Three", Image = "/images/project3.jpg", Page = "/Projects/Project3" }
        };
        }
    }

    public class Project
    {
        public required string Title { get; set; }
        public required string Image { get; set; }
        public required string Page { get; set; }
    }

}
