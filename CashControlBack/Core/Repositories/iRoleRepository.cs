using System;
using FinancialApp.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace FinancialApp.Core.Repositories
{
	public interface IRoleRepository
	{
		ICollection<IdentityRole> GetRoles();
	}
}

