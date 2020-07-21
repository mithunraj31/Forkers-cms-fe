export interface StompSubscriber {
    topic: string;
    onReceivedMessage: Function;
}