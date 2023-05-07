using System;
using FinancialApp.Areas.Identity.Data;

namespace FinancialApp.Core.Repositories
{
	public interface IUserRepository
	{
		ICollection<ApplicationUser> GetUsers();

		ApplicationUser GetUser(string id);

		ApplicationUser UpdateUser(ApplicationUser user);
	}
}

