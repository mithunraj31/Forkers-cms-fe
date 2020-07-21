export interface Event {
    id: string;
    eventId: string;
    deviceId: string;
    driverId?: number;
    type: number;
    time: Date;
    userName:string;

    sensorValue: {
        lat: string;
        lng: string;
        gx: string;
        gy: string;
        gz: string;
        roll: string;
        pitch: string;
        yaw: string;
        status:number;
        direction:string;
        speed:number;
    };

    video: {
        videoId:string;
        noOfCamera:number;
        noOfVideo:number;
        videoUrl?:string;
    };
}
