import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BikesService} from '../../services/bikes.service';
import {Router} from '@angular/router';
import {Bike} from '../../models/Bike.model';

@Component({
  selector: 'app-bike-form',
  templateUrl: './bike-form.component.html',
  styleUrls: ['./bike-form.component.scss']
})
export class BikeFormComponent implements OnInit {

  bikeForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  colors = [
    {hexadecimal: '#9400D3', name: 'Purple'},
    {hexadecimal: '#4B0082', name: 'Dark Purple'},
    {hexadecimal: '#0000FF', name: 'Blue'},
    {hexadecimal: '#00FF00', name: 'Green'},
    {hexadecimal: '#FFFF00', name: 'Yellow'},
    {hexadecimal: '#FF7F00', name: 'Orange'},
    {hexadecimal: '#FF0000', name: 'Red'}
  ];

  constructor(private formBuilder: FormBuilder,
              private bikesService: BikesService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bikeForm = this.formBuilder.group({
      color: ['', Validators.required],
      comment: ['', Validators.maxLength(300)]
    });
  }

  onSaveBike() {
    const color = this.bikeForm.get('color').value;
    const comment = this.bikeForm.get('comment').value;
    const newBike = new Bike(color, comment);
    this.bikesService.createNewBike(newBike);
    this.router.navigate(['/bikes']);
  }
}
