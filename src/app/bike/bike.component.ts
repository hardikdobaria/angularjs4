import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BikeService } from './bike.service';
import { Bike } from './bike';

@Component({
   selector: 'app-bike',
   templateUrl: './bike.component.html',
   styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {
   // Component properties
   allBikes: Bike[];
   statusCode: number;
   requestProcessing = false;
   bikeIdToUpdate = null;
   processValidation = false;

   // Create form
   bikeForm = new FormGroup({
       model: new FormControl('', Validators.required),
       manufacturer: new FormControl('', Validators.required)
   });
   // Create constructor to get service instance
   constructor(private bikeService: BikeService) {
   }
   // Create ngOnInit() and and load bikes
   ngOnInit(): void {
     this.getAllBikes();
   }
   // Fetch all bikes
   getAllBikes() {
        this.bikeService.getAllBikes()
      .subscribe(
                data => this.allBikes = data,
                errorCode =>  this.statusCode = errorCode);
   }
    // Handle create and update Bike
   onBikeFormSubmit() {
     this.processValidation = true;
     if (this.bikeForm.invalid) {
       return; // Validation failed, exit from method.
     }
     // Form is valid, now perform create or update
     this.preProcessConfigurations();
     const model = this.bikeForm.get('model').value.trim();
     const manufacturer = this.bikeForm.get('manufacturer').value.trim();
     if (this.bikeIdToUpdate === null) {
       // Handle create Bike
       const bike = new Bike(null, model, manufacturer);
       this.bikeService.createBike(bike)
         .subscribe(successCode => {
           this.statusCode = successCode;
           this.getAllBikes();
           this.backToCreateBike();
         },
         errorCode => this.statusCode = errorCode);
     } else {
       // Handle update Bike
       const bike = new Bike(this.bikeIdToUpdate, model, manufacturer);
       this.bikeService.updateBike(bike)
         .subscribe(successCode => {
           this.statusCode = successCode;
           this.getAllBikes();
           this.backToCreateBike();
         },
         errorCode => this.statusCode = errorCode);
     }
   }

   // Load bike by id to edit
   loadBikeToEdit(id: string) {
      this.preProcessConfigurations();
      this.bikeService.getBikeById(id)
        .subscribe(bike => {
                this.bikeIdToUpdate = bike.id;
                this.bikeForm.setValue({ model: bike.model, manufacturer: bike.manufacturer });
          this.processValidation = true;
          this.requestProcessing = false;
        },
        errorCode =>  this.statusCode = errorCode);
   }
   // Delete bike
   deleteBike(id: string) {
      console.log(id);
      this.preProcessConfigurations();
      this.bikeService.deleteBikeById(id)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllBikes();
          this.backToCreateBike();
       },
       errorCode => this.statusCode = errorCode);
   }

   // Perform preliminary processing configurations
   preProcessConfigurations() {
     this.statusCode = null;
     this.requestProcessing = true;
   }

   // Go back from update to create
   backToCreateBike() {
     this.bikeIdToUpdate = null;
     this.bikeForm.reset();
     this.processValidation = false;
   }


}
