import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Users } from '../../../model/user';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { LoginService } from '../../../_services/login.service';


declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  user : Users = new Users();
  agree:boolean;
  errMsg:string;
  succMsg:string;
  signUpGroup: FormGroup;
  roles =['ROLE_ADMIN','ROLE_USER'];
  constructor(private loginService:LoginService,private fb: FormBuilder)  { 
    let formObj = new Object();
    formObj['email']=['', [Validators.required, Validators.email]]
    formObj['phone']=['',Validators.minLength(10)]
    formObj['password']=['',[Validators.minLength(8) , Validators.required]];
    formObj['confirmPassword']= ['', Validators.required];
    formObj['username']=['' ,Validators.required]
    formObj['city']=[]
    formObj['role']=['',Validators.required ]
    formObj['agree']=['' ,Validators.required]
    this.signUpGroup = this.fb.group(formObj,
    //Second Parameter
     {
       validator: passwordMatch
     });
  }

  


  ngOnInit() {
    $('body').addClass('empty-layout bg-silver-300');
  }
  initReg(){
    let roles=[];
    roles.push('ROLE_USER');
    this.user.name='Mainuddin';
    this.user.role = roles;
    this.user.email='moin@gmail.com';
    this.user.city='bbsr';
    this.user.mobile='1234567890';
    this.user.username='moinuser';
    this.user.password='12345678';
    this.user.cpassword='12345678';
    this.agree = true;



  }
  register(){
   // this.initReg();
    /**  let roles=[];
    roles.push(this.user.roles);
    this.user.roles = roles; **/
    console.log(this.user);
this.loginService.signup(this.user).subscribe(res=>{

  console.log(res['_body']);
  this.errMsg=null;
  this.succMsg = res['_body'];

}
, error=> {
 console.log(error['_body']);
 this.succMsg=null;
 this.errMsg =error['_body'];
}
)
  
  }

  /** ngAfterViewInit() {
    $('#register-form').validate({
        errorClass: "help-block",
        rules: {
            name: {
                required: true,
                minlength: 2
            },
           
            email: {
                required: true,
                email: true
            },
            city: {
              required: false
              
          }, phone: {
            required: false,
            minlength: 10
        },
        username: {
          required: true
        
      },
            password: {
                required: true,
                confirmed: true,
                minlength: 8
            },
            password_confirmation: {
                equalTo: 'password'
            },
            agree:{
              required:true
            }
        },
        highlight: function(e) {
            $(e).closest(".form-group").addClass("has-error")
        },
        unhighlight: function(e) {
            $(e).closest(".form-group").removeClass("has-error")
        },
    }); 
  }**/

  ngOnDestroy() {
    $('body').removeClass('empty-layout bg-silver-300');
  }

}
function passwordMatch(formGroup: FormGroup): ValidationErrors | undefined {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');

  if(passwordControl.value === confirmPasswordControl.value){
    return null;      
  } else {
    return {
      passwordMatch: true
    }
  }
}