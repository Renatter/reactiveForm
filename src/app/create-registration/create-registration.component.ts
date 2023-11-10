import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ ApiService} from "../service/api.service"
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent implements OnInit {

   packeges = ['Monthly', 'Quaterly', 'Yearly']
   genders = ['Male', 'Female']

   registerForm!: FormGroup;
   constructor(private fb:FormBuilder, private api: ApiService, private toastService: NgToastService){

   }
   ngOnInit(): void {
     this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      bmi: ['', Validators.required],
      bmiResult: ['', Validators.required],
      gender: ['', Validators.required],
      requireTrainer: ['', Validators.required],
      package: ['', Validators.required],
      enquiryDate: ['', Validators.required]
     })
     this.registerForm.controls['height'].valueChanges.subscribe(res =>{
      console.log(res)
      this.calculateBmi(res)
     })
   }
   submit(){
   this.api.postRegister(this.registerForm.value).subscribe(res=>{
    this.toastService.success({detail:'Succes', summary:'User added', duration: 3000})
    this.registerForm.reset()
   })
   }

   calculateBmi(heightValue:number){
      let weight = this.registerForm.get('weight')!.value;
      let height = heightValue;
      let bmi = +(weight / Math.pow(height / 100, 2)).toFixed(1)

      this.registerForm.controls['bmi'].patchValue(bmi)
      console.log(bmi)

      switch (true) {
        case bmi < 18.5 :
          this.registerForm.controls['bmiResult'].patchValue("Underweight");
          break;
        case (bmi > 18.5 && bmi < 25):
          this.registerForm.controls['bmiResult'].patchValue("Normal");
          break;
        case (bmi > 25 && bmi < 30):
          this.registerForm.controls['bmiResult'].patchValue("Overweight");
          break;
  
        default:
          this.registerForm.controls['bmiResult'].patchValue("Obese");
          break;
      }
   }
}
