import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormArray,FormControl, Form} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logbook!: FormGroup;
  droneInfo!: FormGroup
  message:string='';
  isProcess:Boolean=false;
  className='d-none';
  name = 'Angular';
  traineeList:any[] = [];
	list = document.getElementById("list");
 
  constructor(private fb: FormBuilder ,private auth: AuthService) {
    this.logbook = this.fb.group({
      'trainer': ['', Validators.required],
      'trainee': ['', Validators.required],
      'drone': ['', Validators.required],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'duration': ['', Validators.required],
    
      trainees: this.fb.array([]) ,  
    }); 

    this.droneInfo = this.fb.group({
      'uinno': ['', Validators.required],
      'class': ['', Validators.required],
      'category': ['', Validators.required]
    })

    this.trainees;
  }

  ngOnInit():void{

  }

  trainees() : FormArray {  
    return this.logbook.get("trainees") as FormArray  
  }  
     
  newTrainy(): FormGroup {  
    return this.fb.group({  
      trainy: '',    
    })  
  }  
     
  addTrainee() {  
    this.trainees().push(this.newTrainy());  
  }  
     
  removeTrainee(i:number) {  
    this.trainees().removeAt(i);  
  }  

  updateTrainee(){
    this.logbook_submit();
  }

  newTrainee(){
    let inputText = (<HTMLInputElement>document.getElementById("newTrainee")).value;
    // (<HTMLInputElement>document.getElementById("traineeList")).value = this.traineeList.toString();
		this.traineeList.push(inputText);
		console.log(this.traineeList);

		let li = document.createElement("li");
		li.innerHTML = `${inputText} <button class="close" onclick="removeFromArr('${inputText}')"><span aria-hidden="true">&times;</span></button>`;
    console.log(li)
		document.getElementById("list")!.appendChild(li)!;
  }

  removeFromArr(value:any) {
    let index = this.traineeList.indexOf(value);
    if (index > -1) {
      this.traineeList.splice(index, 1);
    }
    console.log(this.traineeList);

    let li = document.querySelector(`li:contains(${value})`);
    li!.parentNode!.removeChild(li!);
  }
     
  logbook_submit() {
  // this.isProcess=true;
    const data = this.logbook.value;
    delete data['confirm'];
    this.auth.reglogbook(data).subscribe(res => {
      if(res.success){
        // alert('ssss');
        this.isProcess=false;
        this.message="Account has been Created! ...";
        this.className="alert alert-success";
      }else{
        // alert('dddd');
        this.isProcess=false;
        this.message="server error..";
        this.className="alert alert-danger";
      }
      // alert("user register succ ....");
      // this.signupFrom.reset();
    }, err => {
      //alert('ssssddddd');
      alert(err)
    })
  }
}
