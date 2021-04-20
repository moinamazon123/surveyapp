import { Injectable } from '@angular/core';

import {Router} from '@angular/router';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { Users } from '../model/user';
import { Survey } from '../model/survey';
import { UserResponse } from '../model/UserResponse';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmailNotification } from '../model/EmailNotification';



@Injectable()
export class SurveyService {
  private serverPath:string = 'http://localhost:9090';//AppConst.serverPath;



  constructor(private http:Http, private httpClient: HttpClient,private router:Router  ) { }


 


  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'assets/survey.json', name: 'Survey' }
    ];
  }

  createSurvey(survey:Survey,surveyLogo:File){
console.log("Posting survey",survey," to server",surveyLogo);
surveyLogo = surveyLogo!=null?surveyLogo:new File([""], "fakeLogo");
let formData = new FormData();
    formData.append("surveyLogo", surveyLogo);
    formData.append("surveyRequest", JSON.stringify(survey));

 
    let url = this.serverPath+'/api/survey/createSurveyWithImage';
    let basicHeader = "Bearer "+localStorage.getItem("token");
  	let headers = new Headers({
  	
  		'Authorization' : basicHeader
  	});
  
      return this.http.post(url,formData,{headers: headers});
  
  }

 submitSurvey(survey:Survey){
    console.log("Posting survey",survey);
  
        let url = this.serverPath+'/api/survey/createSurvey';
        let basicHeader = "Bearer "+localStorage.getItem("token");
        console.log(basicHeader)
        let headers = new Headers({
          'Content-Type' : 'application/json',
        
          'Authorization' : basicHeader
        });
      
          return this.http.post(url,JSON.stringify(survey),{headers: headers});
      
      }
      removeSurvey(survey:Survey){
        console.log("Posting survey",survey);
      
            let url = this.serverPath+'/api/survey/deleteSurveyById/'+survey.id;
            let basicHeader = "Bearer "+localStorage.getItem("token");
            console.log(basicHeader)
            let headers = new Headers({
              'Content-Type' : 'application/json',
            
              'Authorization' : basicHeader
            });
          
              return this.http.get(url,{headers: headers});
          
          }

surveyList(){
  let url = this.serverPath+'/api/survey/getAllSurvey';
    
  let basicHeader = "Bearer "+localStorage.getItem("token");
  console.log(basicHeader)
  let headers = new Headers({
  
    'Authorization' : basicHeader
  });

  return this.http.get(url, {headers: headers});

}
surveyByIndex(index){
  console.log(index)
  let url = this.serverPath+'/api/survey/getSurveyByIndex/'+index;
    
  let basicHeader = "Bearer "+localStorage.getItem("token");
  console.log(basicHeader)
  let headers = new Headers({
  
    'Authorization' : basicHeader
  });

  return this.http.get(url, {headers: headers});

}

totSubmittedSurveyList(){
  let url = this.serverPath+'/api/survey/getTotalSubmittedSurvey';
    
  let basicHeader = "Bearer "+localStorage.getItem("token");
  let headers = new Headers({
  
    'Authorization' : basicHeader
  });

  return this.http.get(url, {headers: headers});

}




  getImage(surveyId,filename){
    let url = this.serverPath+'/api/survey/getImage/'+surveyId+"/"+filename;
    
  	let basicHeader = "Bearer "+localStorage.getItem("token");
  	let headers = new HttpHeaders({
  	
  		'Authorization' : basicHeader
  	});
   
  let options = { headers: headers };
  	return this.httpClient.get(url,options);

  }

  getSliderUnit(){
    let url = this.serverPath+'/api/survey/getSliderUnit';
    
  	let basicHeader = "Bearer "+localStorage.getItem("token");
  	let headers = new Headers({
  	
  		'Authorization' : basicHeader
  	});

  	return this.http.get(url, {headers: headers});

  }
  getQuestionType(){
    let url = this.serverPath+'/api/survey/getQuestionType';
    
  	let basicHeader = "Bearer "+localStorage.getItem("token");
  	let headers = new Headers({
  	
  		'Authorization' : basicHeader
  	});

  	return this.http.get(url, {headers: headers});

  }

  getBooleanLabel(){
    let url = this.serverPath+'/api/survey/getBooleanLabel';
    
  	let basicHeader = "Bearer "+localStorage.getItem("token");
  	let headers = new Headers({
  	
  		'Authorization' : basicHeader
  	});

  	return this.http.get(url, {headers: headers});

  }

  postSurvey(userResponse:UserResponse){
    console.log("Posting survey response",userResponse," to server");
        let url = this.serverPath+'/api/survey/postSurveyResponse';
       
         let basicHeader = "Bearer "+localStorage.getItem("token");
          let headers = new Headers({
          'Content-Type' : 'application/json',
          'Authorization' : basicHeader
         
          });
            //console.log(JSON.parse(res['_body']).accessToken);
           
        
     
        return this.http.post(url,JSON.stringify(userResponse),{headers: headers});
        
      
      }

      postNotification(notification:EmailNotification){
        console.log("Posting email ",notification," to server");
            let url = this.serverPath+'/api/survey/sendNotification';
           
             let basicHeader = "Bearer "+localStorage.getItem("token");
              let headers = new Headers({
              'Content-Type' : 'application/json',
              'Authorization' : basicHeader
             
              });
                //console.log(JSON.parse(res['_body']).accessToken);
               
            
         
            return this.http.post(url,JSON.stringify(notification),{headers: headers});
            
          
          }

          getAssignSurveyByUserId(userId){

            let url = this.serverPath+'/api/survey/getAssignSurveyByUserId/'+userId;
            let basicHeader = "Bearer "+localStorage.getItem("token");
            let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization' : basicHeader
           
            });
        
            return this.http.get(url, {headers: headers});

          }

   checktoken(token){

    let flag;
    this.validateToken(token).subscribe( res=>{
     console.log(res);
     flag = res['_body'];

    } , error => {
      flag = error['_body'];
    })
    
  return flag;

   }   

  sendCredential(username: string, password: string) {


  	let url = this.serverPath+'/api/auth/signin';
    let encodedCredentials = btoa(username+":"+password);
    localStorage.setItem('loginUser',username);
  	let basicHeader = "Basic "+encodedCredentials;
  	let headers = new Headers({
  		'Content-Type' : 'application/x-www-form-urlencoded',
  		'Authorization' : basicHeader
  	});

  	return this.http.get(url, {headers: headers});
  }


  login(username: string, password: string) {


    let url = this.serverPath+'/api/auth/signin';
  let credentials = new Object();
  credentials["username"]= username;
  credentials["password"] = password;
  let headers = new Headers({
    'Content-Type' : 'application/json'
   
});

    return this.http.post(url,JSON.stringify(credentials),{headers: headers});
}

signup(user:Users){

  let url = this.serverPath+'/api/auth/signup';
  let headers = new Headers({
    'Content-Type' : 'application/json'
   
});

    return this.http.post(url,JSON.stringify(user),{headers: headers});

}

validateToken(token: string) {

  let url = this.serverPath+'/api/auth/validateToken/'+token;
  

    return this.http.get(url);

   
}
}