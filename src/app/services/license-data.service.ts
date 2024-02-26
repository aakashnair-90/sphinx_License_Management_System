import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class LicenseDataService {

  constructor(private http:HttpClient) { }
  getlicenses(){
    return this.http.get("http://localhost:8085/api/licenses")
  }
  postLicense(licenseData: any) { // Assuming licenseData is the data you want to send
    return this.http.post("http://localhost:8085/api/license/add", licenseData);
}
}
