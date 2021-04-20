import{OnInit, Component, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {Survey}from '../../model/survey';
import {Options, LabelType}from 'ng5-slider';
import {OptionGroup}from '../../model/OptionGroup';
import {Question }from '../../model/Question';
import {Section}from '../../model/section';
import {ActivatedRoute, Router}from '@angular/router';
import { LoginService}from '../../_services/login.service';
import { HttpClient}from '@angular/common/http';
import {UserResponse}from '../../model/UserResponse';
import {QuestionAttempted}from '../../model/QuestionAttempted';
import {FormControl, Validators, FormGroup, FormBuilder}from '@angular/forms';
import { SurveyService}from '../../_services/survey.service';
import { QuestionType}from '../../model/questionType';
import {SliderQuestion} from '../../model/sliderQuestion';

declare let $: any;


@Component({
selector: 'survey-play',
templateUrl: './surveyplay.component.html',
styleUrls: ['./surveyplay.component.css']
})
export class SurveyPlayComponent implements OnInit {

@Input("survey") surveyInput:Survey;
@Input("surveyPlayFlag") surveyPlayFlag:boolean;
surveys;
survey: Survey;
surveyList:Survey[]= [];
sectionList:Section[]= [];
sectionObj:Section = new Section();
userResponse:UserResponse = new UserResponse();
questionAttempted:QuestionAttempted = new QuestionAttempted();
questionAttempteList:QuestionAttempted[]= [];
mode = 'survey';
jsonResponse:string;
sectionLength:number;
surveyName: string;
selectedRating:number;
booleanTouched =false;
stars = [1, 2, 3, 4, 5];
questionTypeList : QuestionType[]= [] ;
mandatoryQuesList:any[]= [];
log: string = '';
originalNumRes = 0;
selected= false;
/** config: QuizConfig = {
'allowBack': true,
'allowReview': true,
'autoMove': false,  // if true, it will move to next question automatically when answered.
'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
'pageSize': 1,
'requiredAll': false,  // indicates if you must answer all the questions before submitting.
'richText': false,
'shuffleQuestions': false,
'shuffleOptions': false,
'showClock': false,
'showPager': true,
'theme': 'none'
}; **/

section = {
index: 0,
size: 1,
count: 1
};
questonNumber =0;
currentSection =0;
currentQuestion:Question=new Question();
questonIndex = {
index: 0,
size: 1,
count: 1
};
list : any[]=[];
previewFlag=false;
surveyGroup: FormGroup;
surveyIndex:number;
ermsg:string;

constructor(private _http:HttpClient,
private surveyService: SurveyService,
private loginService:LoginService,
private route: ActivatedRoute,
private fb: FormBuilder)  {

}

checktoken(token){

let flag;
this.surveyService.validateToken(token).subscribe( res=>{

flag = res['_body'];
console.log(flag==='false');
if(flag==='false'){
console.log("Invalid token, refreshing token")
this.loginService.login(localStorage.getItem("username"),localStorage.getItem("password")).subscribe(res=>{

//console.log(JSON.parse(res['_body']).accessToken);
console.log(JSON.parse(res['_body'])['accessToken']);

localStorage.setItem("token", JSON.parse(res['_body'])['accessToken'] );


}, error => {
}
)
}
} , error => {
flag = error['_body'];
})

return flag;

}

ngOnInit() {

this.surveyIndex=Number(this.route.snapshot.paramMap.get("surveyIndex"));
console.log(this.surveyIndex)
// this.checktoken(  localStorage.getItem("token"));

this.questionTypeList = [{id:1,question_type :'Single Select(Radio)'},{id:2,question_type:'Multi Select'},{id:3,question_type:'Single Line'},{id:4,question_type:'Multi Line'},{id:5,question_type:'Boolean'},{id:6,question_type:'Slider'},{id:7,question_type:'StarRating'},{id:8,question_type:'Image(Checkbox)'}];
this.surveys = this.getAll();
console.log(this.surveys)
if(this.surveyInput!=null){
console.log(this.surveyInput);
this.survey=this.surveyInput;
this.previewFlag =true;
this.loadSurvey( this.survey);
}if(this.surveyIndex!=0){

this.previewFlag =false;
let survey :Survey;
this.surveyService.surveyByIndex(this.surveyIndex).subscribe(res=>{

console.log( res.json());
this.loadSurvey( res.json());

},error=>{
this.ermsg=error['body'];
})
this.survey = survey;
console.log("Surveyplay ", this.survey);


}else{
this.previewFlag =false;
this.surveyName = this.surveys[0].id;
this.get(this.surveyName)
.subscribe((data:Survey) => {
this.survey=data;
console.log( this.survey)
this.loadSurvey(data);
});
}
// this.initializeMulti();
//this.loadQuiz(this.surveyName);
}

getQuestionType(questionTypeId){

let type=null;
this.questionTypeList.forEach(elem=>{
if(elem.id === questionTypeId){
type = elem.question_type;
}
})
return type;
}

getItems(list:any){

let items:any[]=[];
let itemObj:Object=new Object();

list.forEach( (element) => {

itemObj['name']=element.optionText;
itemObj['checked'] = false;

items.push(itemObj)
});

this.list=items;
//return this.list;
}

pushMultiResponse(section,question,option,select){
console.log(option,select.target.checked);
if(select.target.checked){

this.list.push(option+"_"+question.id);

}else{
if(this.list.indexOf(option+"_"+question.id) > -1){  // delete un selected  items
this.list.splice(this.list.indexOf(option+"_"+question.id),1);
}
}
console.log(this.list );
this.pushResponse(section,question);

}

shareCheckedList(item:any[]){

console.log(item);
}
shareIndividualCheckedList(item:{}){
console.log(item);
}

sliderOption(question:Question): Options {
return {
floor:question.sliderQuestion.startValue,//this.sliders[0].floor,// slider.floor,
ceil: question.sliderQuestion.endValue,//this.sliders[0].ceil//slider.ceil,
translate: (value: number, label: LabelType): string => {
switch (label) {
case LabelType.Low:

let sliderUnits: any[]=[];

let unit:string;
this.surveyService.getSliderUnit().subscribe(res=>{
sliderUnits = JSON.parse(res['_body']);
sliderUnits.forEach(elem=>{
if(elem.id === question.sliderQuestion.sliderUnit){
unit = elem.unit;
return ` ${value} (`+unit+`)`;
}
})


},error=>{

}
)



default:
return `${value} `;
}
},
};
}
optionChange(event){
console.log(event)
}



loadQuiz(surveyName: string) {
let survey:Survey=new Survey();;

//this.survey=survey;
console.log(this.survey)
this.mode = 'survey';
}
loadSurvey(data){
let mandFlag=[];
this.survey=data;
this.sectionList =  this.survey.surveySections;
this.sectionLength = this.survey.surveySections.length;

this.survey.surveySections.forEach((element)=>{

element.questions.forEach((question)=>{
if(question.required){
mandFlag.push(element.id+"_"+question.id);
}

})

})
this.mandatoryQuesList = mandFlag;
console.log(this.survey)
console.log("mandatory questions",this.mandatoryQuesList);
}

get filteredSections() {
return (this.survey.surveySections) ? this.survey.surveySections.slice(this.section.index, this.section.index + this.section.size) : [];

/** return (this.quiz.questions) ?
this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : []; **/
}

filteredQuestions(section:Section){
console.log(section);
return (section.questions) ? section.questions.slice(this.questonIndex.index, this.questonIndex.index + this.questonIndex.size) : [];

}
setBooleanValue(section:Section,question:Question){
//console.log(question)
this.booleanTouched=true;

if(question.booleanResponse){

question.textResponse=question.booleanQuestion.labelOn;
console.log(question.textResponse)
question.multiLineFlag = false;
}else{
question.textResponse=question.booleanQuestion.labelOff;
question.multiLineFlag=question.booleanQuestion.isMultilineText?true:false;
//question.textResponse="no";
}

console.log(question);
this.pushResponse(section,question);

}

getResponse(section,id:number){
console.log(section)
return section.questions[id].textResponse;

}
valueChange(value: number): void {
this.log += `valueChanged: ${value}\n`;
}
getNumber(string){
return Number(string);
}

pushResponse(section:Section,question:Question){


/** To delete questionAttempt if user attempts again and select other option from dependant question  */
let dependentQId = 0;
section.questions.forEach(elem=>{
      if(elem.dependentQuestion.dependentOnqId ===question.id
        && elem.dependentQuestion.dependentAnswer!==question.textResponse){
        dependentQId = elem.id;
      }

    })
this.questionAttempteList.forEach(attemptQuest=>{
    if(attemptQuest.questionId === dependentQId){
      let index = this.questionAttempteList.indexOf(attemptQuest);
      this.questionAttempteList.splice(index,1)
    }
})
 console.log( this.questionAttempteList);

  console.log(question,this.originalNumRes,this.selectedRating,question.questionTypeId);

  let questionAttempted:QuestionAttempted=new QuestionAttempted();
  questionAttempted.numericResponse = this.getQuestionType(question.questionTypeId) ==='Slider' ?
                                  this.originalNumRes:
                                  ( this.getQuestionType(question.questionTypeId)  ==='StarRating'?
                                  this.selectedRating:0);//question.numericResponse;

                                  question.numericResponse = this.getQuestionType(question.questionTypeId) ==='Slider' ?
                                  this.originalNumRes:
                                  (this.getQuestionType(question.questionTypeId)  ==='StarRating'?
                                  this.selectedRating:0);
  this.questionAttempteList.forEach((element,index)=>{
    if(element.questionId==question.id && element.sectionId==section.id) this.questionAttempteList.splice(index,1);

 });
 let multiAr=[];
if(this.list!=null && this.list.length>0){

  this.list.forEach((element,index)=>{
    let questionId = element.split("_")[1];
    console.log(questionId)
    if(questionId == question.id){

      multiAr.push(element.split("_")[0])
    }
    console.log(multiAr)
  });

}

 // question.numericResponse =   this.questionTypeList[question.questionTypeId].questionTitle ==='StarRating'?this.selectedRating:0;
  questionAttempted.questionId = question.id;
  questionAttempted.sectionId = section.id;
  questionAttempted.booleanResponse=question.booleanResponse;
  questionAttempted.multilineResponse=question.multiLineFlag?question.booleanQuestion.multilineResponse:"";
  questionAttempted.textResponse = this.getQuestionType(question.questionTypeId) ==='Multi Select'?multiAr.toString():question.textResponse;
  questionAttempted.paragraphResponse = question.paragraph;
  console.log(questionAttempted);
  if(questionAttempted.textResponse!=="" ){
    console.log(questionAttempted.textResponse!=="")
  this.questionAttempteList.push(questionAttempted);
  }
  if(questionAttempted.multilineResponse!=="" ){
    console.log(questionAttempted.multilineResponse!=="" )
    this.questionAttempteList.push(questionAttempted);
    }
    if(questionAttempted.numericResponse!==0 ){
      console.log(questionAttempted.numericResponse!==0)
      this.questionAttempteList.push(questionAttempted);
      }
      if(questionAttempted.paragraphResponse!=="" && questionAttempted.paragraphResponse!=undefined ){
        console.log(questionAttempted.paragraphResponse!=="")
        this.questionAttempteList.push(questionAttempted);
        }
console.log(this.questionAttempteList)
   this.userResponse.surveyId=this.survey.id;
  this.userResponse.questionAttemptedList = this.questionAttempteList;
  this.userResponse.userId=4;
  //this.list=[];
  let ques=[]
  this.questionAttempteList.forEach((element)=>{
    ques.push(element.sectionId+"_"+element.questionId);
  })

    if(this.questionAttempteList.length>0 && questionAttempted.textResponse!=""  &&  this.mandatoryQuesList.includes(questionAttempted.sectionId+"_"+questionAttempted.questionId) ){
   let index = this.mandatoryQuesList.indexOf(questionAttempted.sectionId+"_"+questionAttempted.questionId);
      this.mandatoryQuesList.splice(index,1);
    } if(this.questionAttempteList.length>0 && questionAttempted.numericResponse!==0  &&  this.mandatoryQuesList.includes(questionAttempted.sectionId+"_"+questionAttempted.questionId) ){
      let index = this.mandatoryQuesList.indexOf(questionAttempted.sectionId+"_"+questionAttempted.questionId);
         this.mandatoryQuesList.splice(index,1);
       }if(this.questionAttempteList.length>0 && questionAttempted.paragraphResponse!==""  &&  this.mandatoryQuesList.includes(questionAttempted.sectionId+"_"+questionAttempted.questionId) ){
        let index = this.mandatoryQuesList.indexOf(questionAttempted.sectionId+"_"+questionAttempted.questionId);
           this.mandatoryQuesList.splice(index,1);
         }if
     (question.required && question.options.length==0 && questionAttempted.numericResponse===0 && !this.booleanTouched){
      this.mandatoryQuesList.push(questionAttempted.sectionId+"_"+questionAttempted.questionId);
     }
     if
     (question.required && question.options.length==0 && questionAttempted.textResponse==="" && !this.booleanTouched){
      this.mandatoryQuesList.push(questionAttempted.sectionId+"_"+questionAttempted.questionId);
     }
     if
     (question.required && question.options.length==0 && questionAttempted.paragraphResponse==="" && !this.booleanTouched){
      this.mandatoryQuesList.push(questionAttempted.sectionId+"_"+questionAttempted.questionId);
     }




  console.log( this.mandatoryQuesList);


  console.log(this.userResponse);


}

onRate(event) {
  //alert(event.newValue)

}
  onSelect(question: Question, option: OptionGroup) {
    console.log(question,option)
    question.textResponse = option.optionText;
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

  /**   if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    } **/
  }

  goToQuestion(index: number,sectionpage:number ) {
    if (index >= 0 && index < this.survey.surveySections[sectionpage].questions.length) {
      //this.section.index = index;
      this.currentQuestion = this.survey.surveySections[sectionpage].questions[index];
      this.mode = 'survey';
    }
  }


  goToSection(index: number) {

    this.currentSection = index;
    if (index >= 0 && index < this.section.count) {
      this.section.index = index;
      this.mode = 'survey';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  /** isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  }; **/

  onSubmit() {
    let answers = [];
this.survey.surveySections.forEach(surveySection =>{

  surveySection.questions.forEach(x => answers.push({ 'surveyId': this.survey.id, 'questionId': x.id, 'answered': x.answered }));
  this.mode = 'result';
}
);

   // this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.

  }

  onSurveySubmit(){
    this.mode = 'result';
    this.jsonResponse = JSON.stringify( this.userResponse,null,'\t');
this.surveyService.postSurvey(this.userResponse).subscribe(res=>{
   console.log(res);

},error =>{
  console.log(error)
}

)

console.log("Your response:"+this.userResponse);
  }


  getAll() {
    return [
      { id: 'assets/survey.json', name: 'survey' }
    ];
  }


  get(url: string) {

    return this._http.get(url);



  }
  //quiz service code ends here





}
