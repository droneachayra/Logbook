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
  droneslist:any[]=[];
  timeslot1:any[]=[];
  timeslot2:any[]=[];
  drones:any;
  class:any[]=[];
 
  constructor(private fb: FormBuilder ,private auth: AuthService) {
    this.logbook = this.fb.group({
      'Trainer': ['', Validators.required],
      'Trainee': ['', Validators.required],
      'UIN': ['', Validators.required],
      'Place_of_Operation': ['', Validators.required],
      'DATE': ['', Validators.required],
      'Start_day1': ['', Validators.required],
      'Start_day2': ['', Validators.required],
      'EXAMINER': ['', Validators.required],
      'EXAM_TIME': ['', Validators.required],
      'EXAM_UIN': ['', Validators.required],
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
    if (this.traineeList.length < 12) {
      const traineeName = (<HTMLInputElement>document.getElementById("trainees")).value;
      this.traineeList.push(traineeName);
      (<HTMLInputElement>document.getElementById("trainees")).value='';
    }
    else{
      alert("Cant add more than 12 Trainees ");
    }
  }

  removeTrainee(value:any) {
    let index = this.traineeList.indexOf(value);
    if (index > -1) {
      this.traineeList.splice(index, 1);
    }
  }

  updateTraineeInput(){
    (<HTMLInputElement>document.getElementById("traineeForm")).value = this.traineeList.toString();
  }

  updateTrainerInput(){
    (<HTMLInputElement>document.getElementById("trainers")).value = this.trainerslist.toString();
  }
     
  logbook_submit() {

  }

  getDroneInfo(){
    const info = this.droneInfo.value;
    this.logbook.controls['drone'].setValue(info);
    this
  }

  onChange(event:any){
    const value = event.target.value;
    if(this.trainerslist.length < 3 || this.trainerslist.includes(value)){
      if (this.trainerslist.includes(value)) {
        this.trainerslist = this.trainerslist.filter((item:any) => item !== value);
      } else {
        this.trainerslist.push(value);
      }
    }else{
      event.target.checked = false;
      alert("Please just select 3 trainers");
    }
  }
  updateValue(event:any){
    const value = event.target.value;
    if(this.droneslist.length < 3 || this.droneslist.includes(value)){
      if (this.droneslist.includes(value)) {
        this.droneslist = this.droneslist.filter((item:any) => item !== value);
      } else {
        this.droneslist.push(value);
      }
    }else{
      event.target.checked = false;
      alert("Please just select 3 Drones");
    }
    console.log(this.droneslist);
  }

  calcTimeSlots(){
    if(this.traineeList.length<4){
      return Array(this.traineeList.length);
    }
    else if(this.traineeList.length == 4){
      return Array(2);
    }
    else if(this.traineeList.length == 5 || this.traineeList.length == 6){
      return Array(3);
    }
    else{
      return Array(4);
    }
  }

  timeSlot1Value(event:any, i:any){
    this.timeslot1[i] = event.target.value;
  }

  timeSlot2Value(event:any, i:any){
    this.timeslot2[i] = event.target.value;
  }

}
