import { OptionGroup } from "./OptionGroup";
import {BooleanQuestion} from "./booleanQuestion";
import { SliderQuestion}from "./sliderQuestion";
import {DependentQuestion}from "./dependentQuestion";
import {QuestionType}from "./questionType";

export class Question {

public id:number;
public questionTitle:string;
public questionTypeId:number;
//public questionType:QuestionType = new QuestionType();
public dependentQuestion:DependentQuestion;
public isVisibility : boolean;
public booleanQuestion : BooleanQuestion;
public sliderQuestion:SliderQuestion;
public multiLineFlag:boolean;
public required:boolean;
public paragraph:string;
public textResponse:string;

public isRatingBar:boolean;

public isBoolean:boolean;

public isSlider:boolean;

public options: OptionGroup[];
answered: boolean;
booleanResponse:boolean;
numericResponse:number;


}
