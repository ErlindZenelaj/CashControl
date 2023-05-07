using System;
using CashControlBack.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;

namespace CashControlBack.Core.Repositories
{
	public interface IRoleRepository
	{
		ICollection<IdentityRole> GetRoles();
	}
}

