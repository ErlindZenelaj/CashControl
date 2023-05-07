using System;
using Microsoft.EntityFrameworkCore;

namespace CashControlBack.Models
{
	public class ApplicationDb:DbContext
	{
		public ApplicationDb(DbContextOptions options):base(options)
		{
		}

		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<Category> Categories { get; set; }
	}
}

