import { NetworkType } from '../enums/enum.network-type';

export interface Vehicle {
    id: number,
    online: boolean,
    active: boolean,
    location: {
        lat: string,
        lng: string
    },
    detail: {
        plateNumber?: string,
        scanCode?: string,
        channelNumber?: string,
        groupName?: string,
        tcpServerAddr?: string,
        tcpStreamOutPort?: string,
        udpServerAddr?: string,
        udpStreamOutPort?: string,
        networkType?: NetworkType,
        deviceType?: string,
        createdDate?: Date
    }
}