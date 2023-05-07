using System;
using CashControlBack.Areas.Identity.Data;

namespace CashControlBack.Core.Repositories
{
	public interface IUserRepository
	{
		ICollection<ApplicationUser> GetUsers();

		ApplicationUser GetUser(string id);

		ApplicationUser UpdateUser(ApplicationUser user);
	}
}

