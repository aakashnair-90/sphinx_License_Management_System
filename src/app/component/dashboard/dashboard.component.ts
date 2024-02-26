import { Component } from '@angular/core';
import { LicenseDataService } from 'src/app/services/license-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  licenses:any;
  constructor(private licenseData: LicenseDataService){
    licenseData.getlicenses().subscribe((data)=>{
      console.warn("data",data);
      this.licenses=data;
      console.log(this.licenses);
    });
    
  }
  // licenses = [
  //   { id: 1, lname: 'sfsds', price: '5000' },
  //   { id: 2, lname: 'asdaan', price: '1000' }
  // ];

  selectedOption: string | undefined; // Property to store the selected option
  options = [ // Array of options with labels and corresponding prices
    { label: 'Photoshop', value: 'option1', price: 1000 },
    { label: 'Anti virus', value: 'option2', price: 500 },
    { label: 'VPN', value: 'option3', price: 1020 }
  ];

  getPrice(): number | string {
    // Find the selected option object
    const selected = this.options.find(option => option.value === this.selectedOption);
    // Return the price if an option is selected, otherwise return an empty string
    return selected ? selected.price : '';
  }

  buyLicense() {
    // Find the selected option object
    const selected = this.options.find(option => option.value === this.selectedOption);
    if (selected) {
      // Assuming you have a method in your LicenseService to post the selected option
      const data = {
        licenseName: selected.label, // Include the license name
        price: selected.price // Include the price
      };
      this.licenseData.postLicense(data).subscribe(
        response => {
          // Handle success response
          console.log('License bought successfully:', response);
          window.location.reload();
        },
        error => {
          // Handle error response
          console.error('Error buying license:', error);
        }
      );
    } else {
      console.error('No option selected.');
    }
  }


}
