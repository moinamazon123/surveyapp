import { Section } from "./section";
import {Audit} from "./Audit";
import { Question}from "./Question";

export class Survey{

public id:number;
public surveyIndex:number;
public surveyTitle:string;
public introText:string;
public placeholder:string;
public punchline:string;
public comment:string;
public surveyLogoUrl:string;
public surveyPreviewLogoUrl:string;
public instruction:string;
public createdBy:number;
public isArchiveFlag:boolean;
public archiveDate:string;
public audit:Audit;
public surveySections:Section[];


}
