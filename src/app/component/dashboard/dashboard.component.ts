import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LicenseDataService } from 'src/app/services/license-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  licenses:any;
  userId!: number;
  name!: string;
  constructor(private licenseData: LicenseDataService, private route: ActivatedRoute){  
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Convert the ID to a number
      // Fetch licenses for the specific user ID
      this.licenseData.getLicenses(this.userId).subscribe((data) => {
        console.warn("data", data);
        this.licenses = data;
        console.log(this.licenses);
      });
    });
  }
  
 
  // licenses = [
  //   { id: 1, lname: 'sfsds', price: '5000' },
  //   { id: 2, lname: 'asdaan', price: '1000' }
  // ];

  selectedOption: string | undefined; // Property to store the selected option
  options = [ // Array of options with labels and corresponding prices
    { label: 'Adobe Photoshop', value: 'option1', price: 1000, desc:'Photoshop license' },
    { label: 'Quick Heal', value: 'option2', price: 500, desc:'Anti-Virus license' },
    { label: 'Brave', value: 'option3', price: 1020,desc:'Vpn license' },
    { label: 'Windows OS', value: 'option4', price: 3000, desc:'OS license' },
    { label: 'Microsoft 360', value: 'option5', price: 850, desc:'Microsoft license' },
    { label: 'Google Drive', value: 'option6', price: 299,desc:'Cloud license' }
  ];

  getPrice(): number | string {
    // Find the selected option object
    const selected = this.options.find(option => option.value === this.selectedOption);
    // Return the price if an option is selected, otherwise return an empty string
    return selected ? selected.price : '';
  }
  getDesc(): string {
    // Find the selected option object
    const selected = this.options.find(option => option.value === this.selectedOption);
    // Return the price if an option is selected, otherwise return an empty string
    return selected ? selected.desc : '';
  }

  buyLicense() {
    // Find the selected option object
    const selected = this.options.find(option => option.value === this.selectedOption);
    if (selected) {
      // Create the data payload for the license
      const data = {
        lName: selected.label, // Include the license name
        price: selected.price,
        desc: selected.desc,
        user_id:this.userId
      };
      // Post the license for the specific user ID
      this.licenseData.postLicense(this.userId, data).subscribe(
        response => {
          // Handle success response
          console.log('License bought successfully:', response);
          window.location.reload(); // Reload the page
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
