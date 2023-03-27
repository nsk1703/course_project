import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent {

   @Input() message: string;
   @Output() close = new EventEmitter<void>();


   onClose(){
     this.close.emit()
   }
}

