import { Component, OnInit } from '@angular/core';
import { CompanyApiRequest } from '../services/CompanyApiRequest.service';
import { CompanyProduct } from './companyProduct.model';
import { SalesRecord } from './sales-record.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  products: CompanyProduct[] = [];
  error: string = '';
  newProduct: CompanyProduct = {
    productId: 0,
    productName: '',
    productQuantity: 0,
    productRemainings: 0,
    sellingPrice: 0,
    profit: 0
  };
  showAddProductForm: boolean = false;
  salesRecords: SalesRecord[] = [];
  filterDate: string = '';
  filteredSalesRecords: SalesRecord[] = [];

  constructor(private companyApiRequest: CompanyApiRequest) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.companyApiRequest.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response as CompanyProduct[];

        // Initialize the isEditing property to false for each product
        this.products.forEach((product: CompanyProduct) => {
          product.isEditing = false;
        });
      },
      error: (error) => {
        this.error = 'Failed to fetch products. Please try again later.';
        console.error(error);
      }
    });
  }

  addProduct() {
    // Validate the new product data
    if (!this.newProduct.productName || this.newProduct.sellingPrice <= 0) {
      // Display an error message or handle the invalid data appropriately
      return;
    }

    // Make the API request to create the product
    this.companyApiRequest.createProduct(this.newProduct).subscribe({
      next: (response: any) => {
        const createdProduct: CompanyProduct = response as CompanyProduct;
        this.products.push(createdProduct); // Add the newly created product to the list
        this.clearNewProductForm(); // Clear the form fields
        this.calculateProfit(createdProduct); // Recalculate profits
        this.showAddProductForm = false; // Hide the add product form
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  toggleEditProduct(product: CompanyProduct) {
    product.isEditing = !product.isEditing;
  }

  updateProduct(id: number, product: CompanyProduct) {
    // Update the product
    this.companyApiRequest.updateProduct(id, product).subscribe({
      next: (response: any) => {
        const updatedProduct: CompanyProduct = response as CompanyProduct;
        // Find the updated product in the products array and update it
        const index = this.products.findIndex(p => p.productId === updatedProduct.productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        console.log(updatedProduct);
        // Handle the updated product as needed
      },
      error: (error) => {
        this.error = 'Failed to update the product. Please try again later.';
        console.error(error);
      }
    });

    this.calculateTotalProfit(); // Recalculate the total profit
  }

  deleteProduct(id: number) {
    // Display a confirmation dialog to confirm deletion
    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {
      // Make the API request to delete the product
      this.companyApiRequest.deleteProduct(id).subscribe({
        next: () => {
          console.log('Product deleted successfully');
          // Remove the deleted product from the list
          this.products = this.products.filter(product => product.productId !== id);
        },
        error: (error) => {
          this.error = 'Failed to delete the product. Please try again later.';
          console.error(error);
        }
      });

      this.calculateTotalProfit(); // Recalculate the total profit
    }
  }

  calculateProfit(product: CompanyProduct): number {
    return product.sellingPrice * (product.productQuantity - product.productRemainings);
  }

  calculateTotalProfit(): number {
    let totalProfit = 0;

    this.products.forEach((product: CompanyProduct) => {
      totalProfit += this.calculateProfit(product);
    });

    return totalProfit;
  }

  openAddProductForm() {
    this.showAddProductForm = true;
  }

  cancelAddProduct() {
    this.showAddProductForm = false;
    this.clearNewProductForm();
  }

  clearNewProductForm() {
    this.newProduct = {
      productId: 0,
      productName: '',
      productQuantity: 0,
      productRemainings: 0,
      sellingPrice: 0,
      profit: 0
    };
  }

  generateSalesTable() {
    this.salesRecords = [];

    this.products.forEach((product: CompanyProduct, index: number) => {
      const salesRecord: SalesRecord = {
        date: new Date(),
        productIndex: index + 1,
        productName: product.productName,
        productQuantity: product.productQuantity,
        productRemainings: product.productRemainings,
        price: product.sellingPrice,
        profit: this.calculateProfit(product)
      };

      this.salesRecords.push(salesRecord);
    });
  }

  saveSalesRecords() {
    this.companyApiRequest.saveSalesRecords(this.salesRecords)
      .subscribe({
        next: response => {
          console.log('Sales records saved successfully');
          console.log(this.salesRecords)
          // Handle the successful save as needed
        },
        error: error => {
          console.error(error);
          // Handle the error case as needed
        }
      });
}

fetchSalesRecordsByDate(date: string) {
  this.companyApiRequest.getSalesRecordsByDate(date).subscribe({
    next: (response: any) => {
      this.salesRecords = response as SalesRecord[];
    },
    error: (error) => {
      console.error(error);
    }
  });
}

filterSalesRecordsByDate() {
  if (this.filterDate) {
    const selectedDate = new Date(this.filterDate).toISOString(); // Convert the selected date to the ISO string format
    this.companyApiRequest.getSalesRecordsByDate(selectedDate).subscribe({
      next: (response: any) => {
        this.filteredSalesRecords = response as SalesRecord[];
      },
      error: (error) => {
        console.error(error);
      }
    });
  } else {
    this.filteredSalesRecords = this.salesRecords;
  }
}




 
  }
  