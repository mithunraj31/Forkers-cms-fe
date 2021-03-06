import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// @Component IconLinkPrepartionComponent: add custom link to ng2-smart-table
@Component({
    templateUrl: './icon-link-preparation.component.html',
    styleUrls: ['./icon-link-preparation.component.scss']
})
export class IconLinkPrepartionComponent implements OnInit {

    totalCameras:number;

    totalVideos:number;

    status:string;

    @Input() value: any;

    @Input() rowData: any;


    @Output() onClicked: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.totalCameras=this.value.noOfCamera;
        this.totalVideos=this.value.noOfVideo;
        if(this.totalCameras==0){
            this.status="zeroCamera"
        }
        else if(this.totalVideos<this.totalCameras ){
            this.status="unavailable"
        }else if( this.totalCameras==this.totalVideos && this.value.videoUrl){
            this.status="available";
        }else if (this.totalCameras==this.totalVideos ){
            this.status="processing"
        }
    }

    onLinkClick() {
        this.onClicked.emit(this.rowData); 
}
}