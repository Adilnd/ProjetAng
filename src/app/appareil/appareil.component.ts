import {Component, Input, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string;

  @Input() appareilStatus: string;

  @Input() index: number;

  @Input() id: number;


  constructor(private appareilService: AppareilService) {
  }

  ngOnInit() {
  }



  getColor() {
    if (this.appareilStatus === 'éteint') {
      return 'red';
    } else if (this.appareilStatus === 'Allumé') {
      return 'green';
    }
  }

  onSwithOn()
  {
    this.appareilService.SwitchOnOne(this.index);
  }

  onSwithOff()
  {
    this.appareilService.SwitchOffOne(this.index);
  }

}
