import { Component, OnInit } from '@angular/core';
import { CompanyApiRequest } from '../services/CompanyApiRequest.service';
import { CompanyProduct } from './companyProduct.model';

@Component({
  selector: 'app-product',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  products: CompanyProduct[] = []; // Array to store the fetched products
  error: string = ''; // Variable to store error messages, if any
  newProduct: CompanyProduct = {
    productId: 0,
    productName: '',
    productQuantity: 0,
    productRemainings: 0,
    sellingPrice: 0,
    profit: 0
  }; // Object to store the new product being added
  showAddProductForm: boolean = false; // Flag to control the visibility of the add product form

  constructor(private companyApiRequest: CompanyApiRequest) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.companyApiRequest.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response as CompanyProduct[];
      },
      error: (error) => {
        this.error = 'Failed to fetch products. Please try again later.';
        console.error(error);
      }
    });
  }
  
  getProductById(id: number) {
    this.companyApiRequest.getProductById(id).subscribe({
      next: (response: any) => {
        const product: CompanyProduct = response as CompanyProduct;
        console.log(product);
        // Handle the retrieved product as needed
      },
      error: (error) => {
        this.error = 'Failed to fetch the product. Please try again later.';
        console.error(error);
      }
    });
  }
  
  // createProduct() {
  //   this.companyApiRequest.createProduct(this.newProduct).subscribe({
  //     next: (response: any) => {
  //       const createdProduct: CompanyProduct = response as CompanyProduct;
  //       this.products.push(createdProduct); // Add the newly created product to the list
  //       this.clearNewProductForm(); // Clear the form fields
  //       this.calculateProfit(createdProduct); // Recalculate profits
  //       this.showAddProductForm = false; // Hide the add product form
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  // }
  addProduct() {
    // Validate the new product data
    if (!this.newProduct.productName || this.newProduct.productQuantity <= 0 || this.newProduct.productRemainings < 0 || this.newProduct.sellingPrice <= 0) {
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
  
  
  
  updateProduct(id: number, product: CompanyProduct) {
    this.companyApiRequest.updateProduct(id, product).subscribe({
      next: (response: any) => {
        const updatedProduct: CompanyProduct = response as CompanyProduct;
        console.log(updatedProduct);
        // Handle the updated product as needed
      },
      error: (error) => {
        this.error = 'Failed to update the product. Please try again later.';
        console.error(error);
      }
    });
  }
  
  deleteProduct(id: number) {
    this.companyApiRequest.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        // Perform any necessary actions after deletion
      },
      error: (error) => {
        this.error = 'Failed to delete the product. Please try again later.';
        console.error(error);
      }
    });
  }
  
  calculateProfit(product: CompanyProduct): number {
    return (product.productQuantity - product.productRemainings) * product.sellingPrice;
  }
  
  
  
  openAddProductForm() {
    this.showAddProductForm = true;
  }
  
  clearNewProductForm() {
    this.newProduct.productId = 0;
    this.newProduct.productName = '';
    this.newProduct.productQuantity = 0;
    this.newProduct.productRemainings = 0;
    this.newProduct.sellingPrice = 0;
    this.newProduct.profit = 0;
  }
}
