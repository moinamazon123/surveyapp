import { Component, Input } from '@angular/core';
import { Options } from 'ng5-slider';



@Component({
  selector: 'star-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  @Input() index: number;
  @Input() selected: number;
  @Input() hover: number;
  @Input() enableStarFlag:boolean;




}
