import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { FormControl ,FormGroup } from '@angular/forms';
import { Survey } from '../../model/survey';
import { Section } from '../../model/section';
import { OptionGroup } from '../../model/OptionGroup';
import { Options } from "ng5-slider";
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Question } from '../../model/Question';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser';

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
    survey:Survey = new Survey();
    buildsurvey:Survey = new Survey();
    editSurvey:Survey = new Survey();
    section:Section = new Section();
    buildQueSection:Section = new Section();
    question:Question = new Question();
    questionsList:Question[]=[];
    surveyList:Survey[]=[];
    sectionList: Section[]=[];
    surveyLogoUrl:any;
    fileToUpload: any;
    surveyBuidFlag:boolean = false;
    surveyQuestionFlag=false;
    updateSurveyFlag = false;
    dependentFlag:string="no";
    dependentAnsList=[];
    dependentAns:string;
    isInlineText:string="no";
    isMultiLineText:string="no";
    updateSurveyIndex =0;
    cancelEditFlag=false;
    inlineTextCheck=false;
    paragraph:string;
    textResponse:string;
    cancelEdit:Survey = new Survey();
    questionTypeList : any = [{questionTypeId:0,questionTitle:'Single Select(Radio)'},{questionTypeId:1,questionTitle:'Multi Select'},{questionTypeId:2,questionTitle:'Single Line'},{questionTypeId:3,questionTitle:'Multi Line'},{questionTypeId:4,questionTitle:'Boolean'},{questionTypeId:5,questionTitle:'Slider'},{questionTypeId:6,questionTitle:'StarRating'},{questionTypeId:7,questionTitle:'Image(Checkbox)'}];
    dependQuestions : any =['Queston 1','Queston 2','Queston 3'];
    dependentQuestionId:number;
    optionList : OptionGroup[] = [{ id: 0, optionText : null,optionRating:0,optionBoolean:false,sliderValue:0}];
    sliderUnits:any = ['Days','Lac','Thousand','Litre'];
    sliderUnit:string;
    rowIndex=0;
    onChange: Function;
    questionType:number;
    jsonData:string;
    loggedInUser:string;

    stars = [1, 2, 3, 4, 5];
    selected: number;
    hover: number;
    enableFlag = false;
    enableStarFlag = false;

    now: Date = new Date();
    buildSectionFlag = false;
    buildQuestionsFlag = false;  

   //Slider Configuration

   startValue: number = 5;
  endValue: number = 50;
  interval=1;
  sliderValue = 0;
 
  totalstar = 10;
    rating=0;
 questionId=15;
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
    constructor(private _script: ScriptLoaderService,private sanitizer : DomSanitizer,@Inject(DOCUMENT) private dom: Document) { 
    
    }
  
    sliderChanged(){
        console.log(this.startValue);
        console.log(this.endValue);
        console.log(this.interval);
     
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
          ceil: this.endValue//slider.ceil
        };
      }
      sliderOption(): Options {
        return {
          floor:this.startValue,//this.sliders[0].floor,// slider.floor,
          ceil: this.endValue//this.sliders[0].ceil//slider.ceil
        };
      }

    sliderEvent() {
        alert(this.sliderValue);
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

   

    ngOnInit(){
this.loggedInUser = sessionStorage.getItem("username");
    }
    clearValues(){
        this.survey.surveyTitle='';
        this.survey.instruction='';
        this.survey.placeholder='';
        this.survey.punchline='';
        this.updateSurveyFlag = false;
    }
    backSurvey(){
        this.surveyBuidFlag = false;
        this.surveyQuestionFlag = false;
    }
    surveyEdit(i){
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

setDependentAns(){
//  alert(this.dependentQuestionId);
  //this.dependentAnsList=[];
  let ansList = this.buildQueSection.questions[this.dependentQuestionId].options;
  console.log(this.dependentQuestionId);
  this.dependentAnsList = ansList;
  console.log(this.dependentAnsList);
  this.dependentAns="Test Answer";
//return ansList;
}


change(event) {
  console.log(this.questionType);
  if(this.questionTypeList[this.questionType].questionTitle ==='Slider'){
    this.enableFlag = true;
    this.enableStarFlag = false;
  }else if(this.questionTypeList[this.questionType].questionTitle ==='StarRating'){
    this.enableStarFlag = true;
    this.enableFlag = false;
  }else{
    this.enableFlag = false;
    this.enableStarFlag = false;
  }
    console.log(event);
 
    
  }
  getLogoUrl(){
    return    this.surveyLogoUrl;
  }

  uploadLogo(event){
    //console.log(surveyId);
   let blobUrl=null;
    const file = (event.target as HTMLInputElement).files[0];
   
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.surveyLogoUrl = event.target.result;
      this.survey.surveyLogoUrl =   this.surveyLogoUrl;
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
  resetQuestion(){

    this.rating=0;
    
   this.dependentQuestionId=0 
   this.question.questionTitle=null;
    this.questionType=-1;
    this.dependentFlag="no";;
   this.isInlineText="no";
   this.isMultiLineText="no";
    this.optionList=[]

  }



addQuestion(){
   
    console.log(this.rating); 
    console.log(this.startValue)
    console.log(this.endValue)
    console.log(this.interval)  
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
    question.id = this.buildQueSection.questions!=null && this.buildQueSection.questions.length>0?this.buildQueSection.questions.length+1:1;
    question.dependentOnqId = this.dependentQuestionId;
    console.log(this.question.questionTitle);
    question.questionTitle = this.question.questionTitle
    question.isInlineText=this.question.isInlineText;
    question.isMultilineText = this.question.isMultilineText;
    question.dependentFlag =  this.dependentFlag;
    question.textRespoonse = this.textResponse;
    question.sliderUnit = this.sliderUnit;
    question.paragraph = this.paragraph;
    question.dependentAnswer = this.dependentAns;
    if(this.questionTypeList[this.questionType].questionTitle ==='Slider'){
        question.isSlider = true;
         question.endValue = this.endValue;
    question.startValue = this.startValue;
    question.interval = this.interval;
    }
    if(this.questionTypeList[this.questionType].questionTitle ==='Boolean'){
        question.isBoolean = true;

        if(this.question.isInlineText === 'yes'){
          question.isInlineText=this.question.isInlineText;
          //question.inlineAnswer = 
        }
        if(this.question.isMultilineText === 'yes'){
          question.isMultilineText=this.question.isMultilineText;
          //question.inlineAnswer = 
        }

       
    }
    if(this.questionTypeList[this.questionType].questionTitle ==='StarRating'){
        question.isRatingBar = true;
    }
    if(this.questionTypeList[this.questionType].questionTitle ==='StarRating'){
        question.isRatingBar = true;
    }
   // this.question = question;
   //this.question.options = this.optionList;
   question.options = this.optionList;
    questionList.push(question);

    this.buildQueSection.questions= questionList;
    
   //this.sectionList.push(this.buildQueSection)
   console.log(this.sectionList);
    this.survey.surveySections =  this.sectionList;
    this.questionBuild();
    console.log(this.survey);

}

questionTypeSelect(e){
    console.log(e);
}

addOptions(i) {
   
    const ansObj = {
        id: 0, optionText : null,optionRating:0,optionBoolean:false,sliderValue:0
    }
    this.rowIndex+=1;
       
   
    this.optionList.push(ansObj);
   // this.blobAnsList.push(file);
    console.log( this.optionList);
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
        
        this.surveyBuidFlag = true;
        this.buildSectionFlag = true;
        this.buildsurvey = this.surveyList[i];
        if( this.buildsurvey.surveySections!=null && this.buildsurvey.surveySections.length>0){
            this.surveyQuestionFlag = true;
        }
        console.log(this.surveyList[i]);
    }
    onSubmit(){
        let survey:Survey = new Survey();
        survey.id =  this.updateSurveyFlag?this.editSurvey.id :(this.surveyList.length>0?this.surveyList.length+1 : 1);
        survey.surveyTitle = this.updateSurveyFlag?this.editSurvey.surveyTitle:this.survey.surveyTitle;
        survey.instruction = this.updateSurveyFlag?this.editSurvey.instruction:this.survey.instruction;
        survey.placeholder = this.updateSurveyFlag?this.editSurvey.placeholder:this.survey.placeholder;
        survey.punchline = this.updateSurveyFlag?this.editSurvey.punchline:this.survey.punchline;
        survey.surveyLogoUrl = this.updateSurveyFlag?this.editSurvey.surveyLogoUrl:this.survey.surveyLogoUrl;
       
   console.log(survey);
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

    questionBuild(){
        console.log(this.survey);
        this.jsonData = JSON.stringify( this.survey,null,'\t');
        console.log(this.buildsurvey.surveySections);

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
  