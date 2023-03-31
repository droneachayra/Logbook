import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormArray,FormControl, Form} from '@angular/forms';
import { json } from 'body-parser';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logbook!: FormGroup;
  droneInfo!: FormGroup
  traineeList:any[] = [];
	list = document.getElementById("list");
  trainers:any;
  trainerslist:any[]=[];
  drones:any;
 
  constructor(private fb: FormBuilder ,private auth: AuthService) {
    this.logbook = this.fb.group({
      'trainers': ['', Validators.required],
      'trainee': ['', Validators.required],
      'drone': ['', Validators.required],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'duration': ['', Validators.required],
    }); 

  }

  ngOnInit():void{
    this.auth.gettrainer().subscribe((data) => {
      this.trainers = data
    })  

    this.auth.getdrone().subscribe((data) => {
      this.drones = data;
    })  

  }

  newTrainee(){
    let inputText = (<HTMLInputElement>document.getElementById("trainees")).value;
    // (<HTMLInputElement>document.getElementById("traineeList")).value = this.traineeList.toString();
		this.traineeList.push(inputText);

		let li = document.createElement("li");
		li.innerHTML = `${inputText} <button class="btn" onclick="removeTrainee('${inputText}')"><span>&times;</span></button>`;
		document.getElementById("list")!.appendChild(li)!;
  }

  removeTrainee(value:any) {
    let index = this.traineeList.indexOf(value);
    console.log(index)
    if (index > -1) {
      this.traineeList.splice(index, 1);
    }
    console.log(this.traineeList);

    let li = document.querySelector(`li:contains(${value})`);
    li!.parentNode!.removeChild(li!);
  }
     
  logbook_submit() {

  }

  getDroneInfo(){
    const info = this.droneInfo.value;
    this.logbook.controls['drone'].setValue(info);
    this
  }

  onChange(value:any){
    if (this.trainerslist.includes(value)) {
      this.trainerslist = this.trainerslist.filter((item:any) => item !== value);
    } else {
      this.trainerslist.push(value);
    }
  }
}
