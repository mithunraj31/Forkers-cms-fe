export interface Vehicle {
    id: number,
    isOnline: boolean,
    isActive: boolean,
    location: {
        lat: string,
        lng: string
    }
}