import{Component, OnInit, AfterViewInit, Inject, ViewChild}from '@angular/core';
import {ScriptLoaderService }from '../../_services/script-loader.service';
import {FormControl ,FormGroup, Validators}from '@angular/forms';
import {Survey}from '../../model/survey';
import {Section}from '../../model/section';
import {OptionGroup}from '../../model/OptionGroup';
import { Options, LabelType}from "ng5-slider";
import {FormBuilder, ReactiveFormsModule, FormsModule}from '@angular/forms';
import {Question }from '../../model/Question';
import {DomSanitizer, DOCUMENT }from '@angular/platform-browser';
import {SurveyService}from '../../_services/survey.service';
import {QuestionType}from '../../model/questionType';
import { BooleanQuestion}from '../../model/booleanQuestion';
import {SliderQuestion} from '../../model/sliderQuestion';
import {DependentQuestion}from '../../model/dependentQuestion';
import {LoginService}from '../../_services/login.service';
import {EmailNotification}from '../../model/EmailNotification';
import {AnimationStyleNormalizer}from '@angular/animations/browser/src/dsl/style_normalization/animation_style_normalizer';
import {AnonymousSubject}from 'rxjs/Subject';
import {Router}from '@angular/router';


declare var $:any;

interface SliderDetails {
value: number;

floor: number;
ceil: number;
}

@Component({
selector: 'survey-home',
templateUrl: './survey.component.html',
styleUrls: ['survey.component.css']
})
export class SurveyComponent implements OnInit,AfterViewInit {

@ViewChild('multiSelect') multiSelect;
public form: FormGroup;

public data = [];
public settings = {};
public selectedItems = [];
public loadContent: boolean = false;
selectEmailList = [];
selectAssignUserId = [];
loginRequiredFlag:boolean;
email;
survey:Survey = new Survey();
surveyLogo:any;
surveySucc:any;
loading = false;
ermsg:string;
succmsg:string;
buildsurvey:Survey = new Survey();
editSurvey:Survey = new Survey();
section:Section = new Section();
buildQueSection:Section = new Section();
question:Question = new Question();
editquestion:Question = new Question();
notification:EmailNotification =new EmailNotification();
questionsList:Question[]= [];
surveyList:Survey[]= [];
sectionList: Section[]= [];
surveyLogoUrl:any;
fileToUpload: any;
sectionEditFlag =false;
surveyBuidFlag:boolean = false;
surveyQuestionFlag = false;
updateSurveyFlag = false;
booleanAnsFlag = false;
nonBooleanAnsFlag =false;
ratingFlag:boolean;
enableQuestionType = false;
placeholder:string;
dependentFlag:boolean = false;
dependentAnsList = [];
ratingList = [];
dependentAns:string;
isInlineText:boolean = false;
isMultiLineText:boolean = false;
inlineTextFlag = false;
multiLineTextFlag= false;
inlineTextOff = 'No';
inlineTextOn = 'Yes';
multilineTextOff = 'No';
multilineTextOn = 'Yes';
labelOn:number;
labelOff:number;
on:string;
off:string;
inLineAnswer :string;
inlineQuestion:string;
multilineAnswer:string;
multilineQuestion:string;
isStarRating:boolean;
isSlider:boolean;
isVisibility:boolean;

multiLineAnswer:string;
booleanResponse:boolean;

numericResponse:number;
updateSurveyIndex = 0;
cancelEditFlag =false;
inlineTextCheck = false;
previewSurv = false;
paragraph:string;
textResponse:string;
required = 'Required';
optional = 'Optional';
starLength:number;
requiredFlag = false;
cancelEdit:Survey = new Survey();
questionTypeList : any = [];//[{questionTypeId:0,questionTitle:'Single Select(Radio)'},{questionTypeId:1,questionTitle:'Multi Select'},{questionTypeId:2,questionTitle:'Single Line'},{questionTypeId:3,questionTitle:'Multi Line'},{questionTypeId:4,questionTitle:'Boolean'},{questionTypeId:5,questionTitle:'Slider'},{questionTypeId:6,questionTitle:'StarRating'},{questionTypeId:7,questionTitle:'Image(Checkbox)'}];
//dependQuestions : any =['Queston 1','Queston 2','Queston 3'];
questionTypeId:number;
dependentQuestionId:number;
optionList : OptionGroup[] =  [{ id: 0, optionText : null,optionRating:0,optionBoolean:false,sliderValue:0,selected:false}];
sliderUnits:any[] = [];//['Days','Lac','Thousand','Litre'];
booleanValues:any = [];//['Yes','No','Required','Not Required','Agree','Disagree','true','false'];
sliderUnit:number;
rowIndex = 0;
onChange: Function;
questionType:QuestionType = new QuestionType();
booleanQuestion:BooleanQuestion = new BooleanQuestion();
sliderQuestion:SliderQuestion = new SliderQuestion();
dependentQuestion:DependentQuestion = new DependentQuestion();
booleanQuestionList: BooleanQuestion[]= [];
jsonData:string;
loggedInUser:string;
userid:number;
stars = [];
selected: number;
hover: number;
enableFlag = false;
enableStarFlag = false;

now: Date = new Date();
buildSectionFlag = false;
buildQuestionsFlag = false;

retrievedImage: any;

base64Data: any;

retrieveResonse: any;
//Slider Configuration

startValue: number = 5;
endValue: number = 50;
gap = 1;
sliderValue = 0;

totalstar = 10;
rating = 0;
questionId = 15;
 simpleSliderValue: number = 200;
 sliders: SliderDetails[] = [
  {
  value:15,
    floor: 5,
    ceil: 50
  },
  {
value:15,
floor: 0,
ceil: 5
},
{
value:15,
floor: 0,
ceil: 100
}
];
constructor(private _script: ScriptLoaderService,private sanitizer : DomSanitizer,@Inject(DOCUMENT) private dom: Document,private surveyService:SurveyService, private router : Router,private loginService:LoginService) {



    }

    getImage(){

      this.surveyService.getImage(1,1).subscribe(res=>{
        this.retrieveResonse = res;

                  this.base64Data = this.retrieveResonse.picByte;

                  this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
console.log( this.retrievedImage)
      },error=>{
      }

)
}

sliderChanged(){
        console.log(this.startValue);
        console.log(this.endValue);
        console.log(this.gap);

    }

    copy() {
      this.selectText('#jsondata');
      // this.selectText('.here-class');
      // this.selectText('input');
      // this.selectText('textarea');
      this.execCopy();
    }

    selectText(selector: string): void {
      const element = this.dom.querySelector(selector);
      const isInputElement = element instanceof HTMLInputElement;
      const isTextAreaElement = element instanceof HTMLTextAreaElement;

      if (isInputElement || isTextAreaElement) {
        (element as HTMLInputElement).select();
      } else {
        let range = this.dom.createRange();
        range.selectNodeContents(element);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    execCopy() {
      try {
        const copyStatus = this.dom.execCommand('copy');
        const message = copyStatus ? 'copied' : 'failed';
        console.log(message);
      } catch (error) {
        console.log(`${error}`);
      }
      window.getSelection().removeAllRanges();
    }


      sliderOptions(slider: SliderDetails): Options {
        return {
          floor:this.startValue,// slider.floor,
          ceil: this.endValue,
          translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return ` ${value} (`+this.sliderUnit+`)`;

                default:
                    return `${value} `;
            }
        }//slider.ceil
        };
      }
      sliderOption(): Options {
        return {
          floor:this.startValue,//this.sliders[0].floor,// slider.floor,
          ceil: this.endValue//this.sliders[0].ceil//slider.ceil
        };
      }

    sliderEvent() {

        // call your api for fetching data
        // this.sliderValue will be updated as it's
        // already 2 way binded
      }
      valueChange(value: number): void {
        this.sliderValue = value;
        console.log(value);
      }
    output(e){
        console.log(e.target.value)
      }

      setBooleanValue(section,question){
        console.log(section,question)
       console.log( this.requiredFlag)
      }
      setBooleanLabel(e){
        console.log(this.labelOn,this.labelOff,e)
        this.getLabelOn();this.getLabelOff();
      }

      getLabelOn(){
        //let on=null;
        this.booleanQuestionList.forEach(bLabel=>{
          if(bLabel.id ===Number(this.labelOn)){
            this.on = bLabel.labelOn;
          }

        })
        console.log(this.on);
        return this.on ;
      }


      getLabelOff(){
        //let off=null;
        this.booleanQuestionList.forEach(bLabel=>{
         // console.log(bLabel.id ===Number(this.labelOff))
          if(bLabel.id ===Number(this.labelOff)){
            this.off = bLabel.labelOff;
          }

        })
        console.log(this.off);
        return this.off ;
      }

      changeStarSize(){
        this.stars=[];
        for(let i=1;i<=this.starLength;i++){
          this.stars.push(i);
        }

      }
      sliderUnitLoad(){
        this.sliderUnits=[];
        this.surveyService.getSliderUnit().subscribe(res=>{
           console.log(JSON.parse(res['_body']));
           this.sliderUnits = JSON.parse(res['_body']);
        },
        error=>{

        }
)
}
getQuestionTypeList(){
        this.surveyService.getQuestionType().subscribe(res=>{
          console.log(JSON.parse(res['_body']));
          this.questionTypeList = JSON.parse(res['_body']);
       },
       error=>{

       }
)

}
getBooleanLabel(){
        this.surveyService.getBooleanLabel().subscribe(res=>{
          console.log(JSON.parse(res['_body']));
          this.booleanQuestionList = JSON.parse(res['_body']);
          console.log( this.booleanQuestionList);
          this.booleanQuestionList.forEach(elem=>{
            this.booleanValues.push(elem.labelOn);
            this.booleanValues.push(elem.labelOff);
          })

       },
       error=>{

       }
)

}

public setForm() {
        this.form = new FormGroup({
          name: new FormControl(this.data, Validators.required)
        });
        this.loadContent = true;
      }

      get f() { return this.form.controls; }

      public save() {
        console.log(this.form.value);
      }

      public resetForm() {
        // beacuse i need select all crickter by default when i click on reset button.
        this.setForm();
        this.multiSelect.toggleSelectAll();
        // i try below variable isAllItemsSelected reference from your  repository but still not working
        // this.multiSelect.isAllItemsSelected = true;
      }

      public onFilterChange(item: any) {
        console.log(item);
      }
      public onDropDownClose(item: any) {
        console.log(item);
      }

      public onItemSelect(item: any) {
        console.log(item);
      }
      public onDeSelect(item: any) {
        console.log(item);
      }

      public onSelectAll(items: any) {
        console.log(items);
      }
      public onDeSelectAll(items: any) {
        console.log(items);
      }



    ngOnInit(){

     /**  this.settings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        enableCheckAll: true,
        selectAllText: 'Select All',
        unSelectAllText: 'Un Select',
        allowSearchFilter: true,
        limitSelection: -1,
        clearSearchFilter: true,
        maxHeight: 197,
        itemsShowLimit: 3,
        searchPlaceholderText: 'Search',
        noDataAvailablePlaceholderText: 'No data',
        closeDropDownOnSelection: false,
        showSelectedItemsAtTop: false,
        defaultOpen: false
      };
      this.setForm();
      let datalist:any=[];let data:any;
      this.loginService.getUsers().subscribe(res=>{

        console.log(res.json())

        res.json().forEach(user=>{
          data=new Object();
          data['item_id']=user.id;
          data['item_text']=user.email;
          this.data.push(data);

        })


      },
      error=>{

      }

      )**/
      this.surveyService.surveyList().subscribe(res=>{
        this.surveyList = res.json()
        console.log(  this.surveyList )
      })

      this.loginService.getUsers().subscribe(res=>{

        console.log(res.json())

        res.json().forEach(user=>{

          this.data.push(user.email+"_"+user.id);

        })


      },
      error=>{

      }

)

this.getImage();
this.loggedInUser = localStorage.getItem("username");
this.userid = Number(localStorage.getItem("userid"));
this.sliderUnitLoad();
this.getQuestionTypeList();
this.getBooleanLabel();
    }
    clearValues(){
        this.survey.surveyTitle='';
        this.survey.instruction='';
        this.survey.placeholder='';
        this.survey.punchline='';
        this.updateSurveyFlag = false;
        this.previewSurv=false;
    }
    backSurvey(){
        this.surveyBuidFlag = false;
        this.surveyQuestionFlag = false;
        this.previewSurv=false;
        this.getSurveyList();
    }
    surveyEdit(i){
      this.updateSurveyFlag = true;
        let surveyObjselected:Survey = this.surveyList[i];
        const surveyList = this.surveyList;
        this.editSurvey = surveyObjselected;
      this.updateSurveyIndex = i;
      this.cancelEdit = surveyList[i];
        console.log(this.editSurvey );
    }
    textChanged(event) {

        console.log('changed', this.editSurvey.surveyTitle, event);
    }


cancelUpdate(){
    console.log(this.cancelEdit );
}

setSliderUnit(event){
 console.log(this.sliderUnit);
}

getSurveyList(){
  this.surveyService.surveyList().subscribe(res=>{

    this.surveyList = res.json();

  },error=>{

  })

}

userlist(){

  this.selectEmailList.push(this.email.split('_')[0]);
  this.selectAssignUserId.push(this.email.split('_')[1]);
  console.log( this.selectEmailList,this.selectAssignUserId);

}
loginRequired(){

 return this.loginRequiredFlag;

}

notifyUser(){

  this.notification.surveyId=this.buildsurvey.id;
  this.notification.surveyURL="http://localhost:9090/surveyplay";
  this.notification.receipientList = this.selectEmailList;
  this.notification.userIds = this.selectAssignUserId;
  this.notification.loginRequired = this.loginRequired();
  console.log( this.notification);
  this.loading=true;
  this.surveyService.postNotification(this.notification).subscribe(res=>{
    console.log(res);
    this.succmsg=res['_body'];
    this.loading=false;
  },error=>{
    this.loading=false;
    this.ermsg=error['_body'];
    console.log( this.ermsg);

  }
)

}

setDependentAns(event){
//  alert(this.dependentQuestionId);
  //this.dependentAnsList=[];
  let ansList=[];
  this.dependentFlag=true;
  console.log(this.getQuestionType(this.buildQueSection.questions[Number(this.dependentQuestionId)-1].questionTypeId)=='Boolean')
  if(this.getQuestionType(this.buildQueSection.questions[Number(this.dependentQuestionId)-1].questionTypeId)=='Boolean') {
    this.nonBooleanAnsFlag = false;
    this.booleanAnsFlag = true;
    this.ratingFlag=false;
    console.log("Question Type Boolean")

  }else{
    //this.nonBooleanAnsFlag = true;
    //this.booleanAnsFlag = false;
    if(this.getQuestionType(this.buildQueSection.questions[Number(this.dependentQuestionId)-1].questionTypeId)=='StarRating'){
this.ratingList=[1,2,3,4,5,6,7,8,9,0];
console.log("Question Type Star Rating")
this.ratingFlag=true;
this.nonBooleanAnsFlag = false;
    this.booleanAnsFlag = false;
    }else {
      console.log("Question Type Other")
      this.ratingFlag=false;
this.nonBooleanAnsFlag = true;
    this.booleanAnsFlag = false;
    ansList = this.buildQueSection.questions[Number(this.dependentQuestionId)-1].options;
    }
    //ansList = this.booleanValues;
  }
  console.log(this.dependentQuestionId,ansList);
  this.dependentAnsList = ansList;
  console.log(this.dependentAnsList);
  //this.dependentAns="Test Answer";
//return ansList;
}

getQuestionType(typeId:number){


   // console.log(typeId);
    let type=null;

    this.questionTypeList.forEach(qType=>{
      if(qType.id === Number(typeId) ){

        type = qType.questionType;

      }

    })
    return type;
}


change(event) {
  console.log(this.questionTypeList,this.questionTypeId);
  let type=null;
  let questionType: QuestionType=new QuestionType();
  this.questionTypeList.forEach(qType=>{
    if(qType.id === Number(this.questionTypeId)){

      type = qType.questionType;

    }

  })


console.log(this.questionType)
  if(type ==='Slider'){
    this.enableFlag = true;
    this.enableStarFlag = false;
  }else if(type ==='StarRating'){
    this.enableStarFlag = true;
    this.enableFlag = false;
  }else{
    this.enableFlag = false;
    this.enableStarFlag = false;
  }
  this.isInlineText=event
    console.log(event,this.isInlineText);


  }
  getLogoUrl(){
    return    this.surveyLogoUrl;
  }

  uploadLogo(event){
    //console.log(surveyId);
   let blobUrl=null;
    const file = (event.target as HTMLInputElement).files[0];
   this.surveyLogo = file;
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.surveyLogoUrl = event.target.result;
      this.survey.surveyPreviewLogoUrl =   this.surveyLogoUrl;
    }
    reader.readAsDataURL(file);
  }

  uploadLogoUP(event,surveyId){
    //console.log(surveyId);
   let blobUrl=null;
    const file = (event.target as HTMLInputElement).files[0];

    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.surveyLogoUrl = event.target.result;
      this.editSurvey.surveyLogoUrl =   this.surveyLogoUrl;
    }
    reader.readAsDataURL(file);
  }

  starChange(){
console.log();

  }

  enableQuesType(){
    this.enableQuestionType=true;
  }
  resetQuestion(){

    this.rating=0;

   this.dependentQuestionId=0
   this.question.questionTitle=null;
    this.questionType=null;
    this.dependentFlag=false;;
   this.isInlineText=false;
   this.isMultiLineText=false;
   this.textResponse="";
   this.booleanResponse = false;
   this.numericResponse =0;
   this.inLineAnswer =null;
   this.multiLineAnswer = null;
   this.sliderUnit=null;
   this.startValue=0;
   this.endValue=0;
   this.isSlider=false;
   this.isStarRating=false;
   this.isVisibility=false;
   this.paragraph=null
   this.requiredFlag=false;
   this.inlineTextFlag=false;
this.multiLineTextFlag = false;
this.question.sliderQuestion=null;
this.question.questionTypeId=0;
this.dependentQuestion=null;
this.question.booleanQuestion = null;
    this.optionList=[]

  }

  updateQuestion(editquestion:Question){
  let deleteOldQuestion =  this.buildQueSection.questions.indexOf(editquestion);
  this.buildQueSection.questions.splice(deleteOldQuestion,1)
   this.addQuestion();
  }
  previewSurvey(i){
    console.log(i)
    this.survey = this.surveyList[i];
    console.log( this.surveyList)
    this.previewSurv = true;
  }

  deleteOptions(optionIndex:number){
    this.optionList.splice(optionIndex,1);
    console.log( this.optionList)
  }

addQuestion(){

    console.log(this.rating);
    console.log(this.startValue)
    console.log(this.endValue)
    console.log(this.gap)
    console.log(this.dependentQuestionId)
    console.log(this.question.questionTitle);
    console.log(this.questionType);
    console.log(this.dependentFlag);
    console.log(this.isInlineText);
    console.log(this.isMultiLineText);
    console.log(this.optionList);

    let section:Section=new Section();
    let questionList =   this.buildQueSection.questions!=null && this.buildQueSection.questions.length>0?this.buildQueSection.questions:[];
    let question:Question = new Question();
 let booleanQuestion:BooleanQuestion=new BooleanQuestion();
let sliderQuestion:SliderQuestion = new SliderQuestion();
 let dependentQuestion:DependentQuestion = new DependentQuestion();
 let questionType:QuestionType = new QuestionType();
    question.id = this.buildQueSection.questions!=null && this.buildQueSection.questions.length>0?this.buildQueSection.questions.length+1:1;
    dependentQuestion.dependentOnqId = Number(this.dependentQuestionId);
    dependentQuestion.dependentFlag = this.dependentFlag?true:false;
    console.log(this.question.questionTitle);
    question.questionTitle = this.question.questionTitle
    question.questionTypeId = Number(this.questionTypeId);
    question.required = this.dependentFlag?false:this.requiredFlag;
     booleanQuestion.isMultilineText = false;
   dependentQuestion.dependentFlag =  this.dependentFlag;
    question.textResponse = this.textResponse;
    dependentQuestion.dependentAnswer = this.dependentFlag ?this.dependentAns:null;
    sliderQuestion.sliderUnit = Number(this.sliderUnit!=null?this.sliderUnit.toString().split("_")[0]:'');
    sliderQuestion.endValue = null;
    sliderQuestion.startValue = null;
    question.paragraph = this.paragraph;
    booleanQuestion.isInlineText=false;
   booleanQuestion.inlineResponse = null;
    booleanQuestion.multilineResponse = null;
    question.isSlider=false;
    question.isBoolean = false;
    question.isRatingBar = false;
    booleanQuestion.inlineAnswer=null;
    booleanQuestion.multilineAnswer=null;
    booleanQuestion.multilineQuestion=null;
    question.paragraph = this.paragraph;
    booleanQuestion.labelOn=null;
    booleanQuestion.labelOff = null;

    question.numericResponse = this.numericResponse;
    this.question.booleanQuestion = booleanQuestion;

   questionType.id=Number(this.questionTypeId);
  console.log( this.questionTypeList);
   this.questionTypeList.forEach(qType=>{
    if(qType.id === questionType.id){
      console.log(qType.questionType);
      questionType.question_type = qType.questionType;

    }

  })
console.log(questionType);

    question.booleanResponse = this.booleanResponse;
    question.sliderQuestion=this.sliderQuestion;
    if( this.getQuestionType(this.questionTypeId) ==='Slider'){
        question.isSlider = true;
        question.sliderQuestion.sliderUnit=  Number(this.sliderUnit!=null?this.sliderUnit.toString().split("_")[0]:'');
         question.sliderQuestion.endValue = this.endValue;
    question.sliderQuestion.startValue = this.startValue;
    question.sliderQuestion.gap = this.gap;
    }
    if(this.getQuestionType(this.questionTypeId)  ==='Boolean'){
      console.log(this.inlineTextFlag,this.question.booleanQuestion.inlineAnswer,this.question.booleanQuestion.inlineQuestion)
        question.isBoolean = true;
        question.booleanQuestion = this.booleanQuestion;
        question.booleanQuestion.labelOn=this.on;
        question.booleanQuestion.labelOff = this.off;
        question.booleanQuestion.isInlineText = this.inlineTextFlag?true:false;
        question.booleanQuestion.inlineAnswer=this.inlineTextFlag?this.inLineAnswer:null;
        question.booleanQuestion.inlineQuestion=this.inlineTextFlag?this.inlineQuestion:null;
        question.booleanQuestion.isMultilineText=this.multiLineTextFlag?true:false;

    question.booleanQuestion.multilineAnswer=this.multiLineTextFlag?this.question.booleanQuestion.multilineAnswer:null;
    question.booleanQuestion.multilineQuestion=this.multiLineTextFlag?this.question.booleanQuestion.multilineQuestion:null;




    }
    if(this.getQuestionType(this.questionTypeId)  ==='StarRating'){
        question.isRatingBar = true;
    }

   // this.question = question;
   //this.question.options = this.optionList;
   question.options = this.optionList;
  // question.booleanQuestion = booleanQuestion;
  // question.sliderQuestion = sliderQuestion;
   question.dependentQuestion = dependentQuestion;
   console.log(  question)
    questionList.push(question);

    this.buildQueSection.questions= questionList;

   //this.sectionList.push(this.buildQueSection)
   console.log(this.sectionList);
    this.survey.surveySections =  this.sectionList;
    this.survey.createdBy =   this.userid;
    this.survey.surveyIndex = this.surveyList.length>0?this.surveyList.length:1;
    this.questionBuild();
    console.log(this.survey);

}
sectionEdit(sectionIndex:number){
console.log(sectionIndex,this.buildsurvey.surveySections)
  this.sectionEditFlag=true;
  this.section = this.buildsurvey.surveySections[sectionIndex];
  console.log(this.section);

}

postSurvey(){

  console.log(this.buildsurvey);
  this.buildsurvey.surveyIndex = this.surveyList.length>0?this.surveyList.length:1;
  this.surveyService.submitSurvey(this.buildsurvey).subscribe(succ=>{
    console.log(succ.json());

  },error=>{
    console.log(error)
  })


}

deleteSurvey(i){

  let surveyDelete:Survey = this.surveyList[i];
  this.surveyService.removeSurvey(surveyDelete).subscribe(res=>{
       console.log("Deleted ",surveyDelete);
      // location.reload();
      this.router.navigate(['/index']);
  })

}


questionTypeSelect(e){
    console.log(e);
}

addOptions(i) {

    const ansObj = {
        id: 0, optionText : null,optionRating:0,optionBoolean:false,sliderValue:0,selected:false
    }
    this.rowIndex+=1;


    this.optionList.push(ansObj);
   // this.blobAnsList.push(file);
    console.log( this.optionList);
  }
  deleteQuestions(i){
    this.buildQueSection.questions.splice(i,1);
  }

  editOptions(rowIndex,editQuestion:Question) {

    const ansObj = {
        id: 0, optionText : null,optionRating:0,optionBoolean:false,sliderValue:0,selected:false
    }
    rowIndex+=1;


   editQuestion.options.push(ansObj);
   // this.blobAnsList.push(file);
    console.log( editQuestion.options);
  }
    updateSurvey(){

        if ( this.updateSurveyIndex !== -1) {
          this.surveyList.splice( this.updateSurveyIndex, 1); // delete the selected survey
        }
        this.updateSurveyFlag = true;
        this.onSubmit();
console.log(this.editSurvey,this.surveyList);
    }
    surveyBuild(i){
      //  this.resetNotification();
        this.surveyBuidFlag = true;
        this.buildSectionFlag = true;
        this.buildsurvey = this.surveyList[i];
        if( this.buildsurvey.surveySections!=null && this.buildsurvey.surveySections.length>0){
            this.surveyQuestionFlag = true;
        }
        console.log(this.surveyList[i]);
        this.jsonData = JSON.stringify( this.surveyList[i],null,'\t');
    }

    resetNotification(){
      this.notification=null;
      this.succmsg=null;
      this.ermsg=null;
    }
    onSubmit(){
        let survey:Survey = new Survey();
        survey.surveyIndex =  this.updateSurveyFlag?this.editSurvey.id :(this.surveyList.length>0?this.surveyList.length+1 : 1);
        survey.surveyTitle = this.updateSurveyFlag?this.editSurvey.surveyTitle:this.survey.surveyTitle;
        survey.instruction = this.updateSurveyFlag?this.editSurvey.instruction:this.survey.instruction;
        survey.placeholder = this.updateSurveyFlag?this.editSurvey.placeholder:this.survey.placeholder;
        survey.punchline = this.updateSurveyFlag?this.editSurvey.punchline:this.survey.punchline;
        survey.surveyLogoUrl = this.updateSurveyFlag?this.editSurvey.surveyLogoUrl:this.survey.surveyLogoUrl;
       // survey.surveyLogoUrl = this.updateSurveyFlag?this.editSurvey.surveyLogoUrl:this.survey.surveyLogoUrl;

   console.log(survey);
   /** this.surveyLogo = fetch(survey.surveyLogoUrl)
      .then((e) => {
        return e.blob()
      })
      .then((blob) => {
        let b: any = blob
        b.lastModifiedDate = new Date()
        b.name = ''
        return b as File
      }) **/
      console.log(this.surveyLogo);
      if(this.updateSurveyFlag) {
   this.surveyService.submitSurvey(survey).subscribe(res=>{
          console.log(res);
          survey = res.json();
          this.surveySucc = "Survey Updated Successfully";
   },error=>{

   })
  }else{
    this.surveyService.createSurvey(survey , this.surveyLogo).subscribe(res=>{
      console.log(res);
      survey = res.json();
      this.buildsurvey = survey;
      this.surveySucc = "Survey Created Successfully";
},error=>{

})
  }

  this.surveyBuidFlag =true;
   this.surveyList.push(survey);
   console.log(this.surveyList);

    }
    generateJson(){

        //this.questionsList.push(this.question);

        console.log(this.section);


        this.jsonData = JSON.stringify( this.section,null,'\t');
    }
    clearSection(){
        this.section.secTitle="";
    }

    saveSection(){
      if(this.sectionEditFlag){
          console.log(this.section);
      } else {
        this.sectionList=[];
        let section :Section = new Section();
        section.secTitle = this.section.secTitle;


        let survey:Survey = new Survey();
        survey.surveyTitle =  this.buildsurvey.surveyTitle;
        survey.instruction =  this.buildsurvey.instruction;
        survey.placeholder =  this.buildsurvey.placeholder;
        if(this.buildsurvey.surveySections!=null && this.buildsurvey.surveySections.length>0){
          console.log("2nd time");
            this.sectionList = this.buildsurvey.surveySections;//.push(section);
            this.sectionList.push(section);
            survey.surveySections = this.sectionList  ;
            this.buildsurvey.surveySections =  this.sectionList;
        } else{
          console.log("1st time");
            this.sectionList.push(section);
            survey.surveySections = this.sectionList  ;
            this.buildsurvey.surveySections =  this.sectionList;
        }
        this.buildsurvey = survey;
        this.surveyQuestionFlag = true;
console.log(survey);
      }

    }

    questionBuild(){
        console.log(this.survey);
        this.jsonData = JSON.stringify( this.survey,null,'\t');
        console.log(this.buildsurvey.surveySections);

    }

    questionEdit(i){
     this.editquestion= this.buildQueSection.questions[i];

    }

    addQuestions(i){
      this.buildQuestionsFlag = true;
      this.resetQuestion();
     this.buildQueSection = this.buildsurvey.surveySections[i];
     this.buildQueSection.id= i;
      console.log(this.section,this.buildQueSection);

  }
  addNewQuestions(){
    this.resetQuestion();
  }

    ngAfterViewInit() {
        this._script.load('./assets/js/scripts/form-plugins.js');
        $("#surveyForm").validate({
            rules: {
                surveyTitile: {
                    //minlength: 2,
                    required: !0
                },
                introText: {
                    required: !0,
                    //email: !0
                }
            },
            errorClass: "help-block error",
            highlight: function(e) {
                $(e).closest(".form-group.row").addClass("has-error")
            },
            unhighlight: function(e) {
                $(e).closest(".form-group.row").removeClass("has-error")
            },
        });
      }



  }
