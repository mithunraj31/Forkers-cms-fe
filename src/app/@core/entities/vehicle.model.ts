import { NetworkType } from '../enums/enum.network-type';

export interface Vehicle {
    id: number,
    isOnline: boolean,
    isActive: boolean,
    location: {
        lat: string,
        lng: string
    },
    plateNumber?: string,
    scanCode?: string,
    channelNumber?: string,
    groupName?: string,
    tcpServerAdress?: string,
    tcpStreamOutPort?: string,
    udpServerAddress?: string,
    udpStreamOutPort?: string,
    networkType?: NetworkType,
    deviceType?: string,
    createdDate?: Date
}