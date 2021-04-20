import { Audit } from "./Audit";
import { QuestionAttempted } from "./QuestionAttempted";

export class UserResponse{

    public id : number;
    public userId:number;
    public surveyId :number;
    public audit:Audit;
    public questionAttemptedList:QuestionAttempted[];

}