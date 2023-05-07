using System;
using CashControlBack.Core.Repositories;

namespace CashControlBack.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public IUserRepository User { get; }
        public IRoleRepository Role { get; }

        public UnitOfWork(IUserRepository user, IRoleRepository role)
        {
            User = user;
            Role = role;
           
        }

        public Task FindByIdAsync(string id)
        {
            throw new NotImplementedException();
        }
    }
}