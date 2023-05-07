using System;

namespace FinancialApp.Core.Repositories
{
	public interface IUnitOfWork
	{
		IUserRepository User { get; }

		IRoleRepository Role { get; }

        Task FindByIdAsync(string id);
    }
}

