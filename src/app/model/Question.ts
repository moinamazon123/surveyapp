import { OptionGroup } from "./OptionGroup";

export class Question {

    public id:number;
    public questionTitle:string;
    public questionTypeId:number;
    public dependentOnqId:number;
    public dependentFlag :string;
    public dependentAnswer:string;
    public isVisibility : boolean;
    public isInlineText :string;
    public inlineAnswer:string;
    public isMultilineText :string;
    public multilineAnswer:string;
    public paragraph:string;
    public textRespoonse:string;
    public sliderUnit:string;
    public isRatingBar:boolean;
    public isSlider:boolean;
    public isBoolean:boolean;
    public startValue:number;
    public endValue:number;
    public interval:number;
    public options: OptionGroup[];



}