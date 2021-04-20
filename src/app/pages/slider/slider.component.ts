import { Component, OnInit, AfterViewInit, Input}from '@angular/core';
import {ScriptLoaderService}from '../../_services/script-loader.service';
import {FormControl ,FormGroup }from '@angular/forms';
import {Survey}from '../../model/survey';
import { Section}from '../../model/section';
import {OptionGroup} from '../../model/OptionGroup';
import {Options, LabelType} from "ng5-slider";
import {FormBuilder, ReactiveFormsModule, FormsModule}from '@angular/forms';
import {Question}from '../../model/Question';
import {DomSanitizer}from '@angular/platform-browser';
declare var $:any;

interface SliderDetails {
value: number;
highValue: number;
floor: number;
ceil: number;
  }

  @Component({
  selector: 'slider-comp',
templateUrl: './slider.component.html',
styleUrls: ['slider.component.css']
})
export class SurveySliderComponent implements OnInit{

@Input() startValue = 0;
@Input() endValue = 50;
@Input() sliderValue=10;
@Input() enableFlag : boolean;
@Input() sliderUnit :number;

sliders: SliderDetails[] = [
{
value: -1,
highValue: 2,
floor: -5,
ceil: 5
        },
        {
          value: 1,
          highValue: 2,
          floor: 0,
          ceil: 5
        },
        {
          value: 30,
          highValue: 60,
          floor: 0,
          ceil: 100
        }
      ];


    ngOnInit(): void {
       console.log("Slider Initialized")
    }

    sliderOptions(slider: SliderDetails): Options {
        return {
          floor: slider.floor,
          ceil: slider.ceil
        };
      }

      sliderOption(): Options {
        return {
          floor:this.startValue,//this.sliders[0].floor,// slider.floor,
          ceil: this.endValue,//this.sliders[0].ceil//slider.ceil,
          translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return ` ${value} (`+this.sliderUnit+`)`;

                default:
                    return `${value} `;
            }
        },
        };
      }

}
