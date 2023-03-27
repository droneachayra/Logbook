import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormArray,FormControl} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logbook!: FormGroup;
  message:string='';
  isProcess:Boolean=false;
  className='d-none';
  
  name = 'Angular';  
 
  constructor(private fb: FormBuilder ,private auth: AuthService) {
    this.logbook = this.fb.group({
      'trainer': ['', Validators.required],
      'trainee': ['', Validators.required],
      'drone': ['', Validators.required],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'duration': ['', Validators.required],
    
      trainies: this.fb.array([]) ,  
    }); 
    this.trainies;
  }
  ngOnInit():void{

  }
  trainies() : FormArray {  
    return this.logbook.get("trainies") as FormArray  
  }  
     
  newTrainy(): FormGroup {  
    return this.fb.group({  
      trainy: '',  
      
    })  
  }  
     
  addTrainy() {  
    this.trainies().push(this.newTrainy());  
  }  
     
  removeTrainy(i:number) {  
    this.trainies().removeAt(i);  
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
