import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../@core/entities/compay.model';

@Component({
    selector: 'frk-companies',
    styleUrls: ['companies.component.scss'],
    templateUrl: 'companies.component.html'
})
export class CompaniesComponent implements OnInit {
    
    companies: Company[] = [];

    // fact to display (true) or drop (false) to table spinner 
    // @type {boolean}
    isLoading: boolean = false;

    constructor (private companyService: CompanyService) {
        
    }

    ngOnInit() {
        this.initialTable();
    }

    // request API to get company information and thire vechicle stutus
    // for display on CompaniesComponent's table.
    // @return {void}
    initialTable() {
        // display table spinner 
        this.isLoading = true;
        this.companyService.getCompanies().subscribe((companies) => {
            // drop table spinner
            this.isLoading = false;
            this.companies = companies;
        }, error =>  {
             // drop table spinner
            this.isLoading = false;
            
        });
    }
}