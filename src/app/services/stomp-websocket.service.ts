import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { StompSubscriber } from '../@core/entities/stomp-subscriber.model';
export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
    providedIn: 'root'
})
export class StompWebsocketService {

    // create single subscriber
    // return connection instance
    createConnection(subscriber: StompSubscriber) {
        return this.createConnections([subscriber]);
    }

    // create multiple subscribers in one connection 
    // return connection instance
    createConnections(subscribers: StompSubscriber[]) {
        // define websocket endpoint from environment variable
        const ws = new SockJS(WS_ENDPOINT);

        // create stomp client connection
        const stompClient = Stomp.over(ws);

        // start connect
        stompClient.connect({}, (frame) => {
            // subscribe each topics
            subscribers.forEach((subscriber: StompSubscriber) => {
                stompClient.subscribe(subscriber.topic, (message: any) => {
                    // convert message body (string of json) to javascript object
                    const jsonObject = JSON.parse(message.body);
                    // trigger subscriber's callback with converted message body
                    subscriber.onReceivedMessage(jsonObject);
                });
            });
        });
        // turn off debug log.
        stompClient.debug = () => {};
        return stompClient;
    }

    // disconnect the obtained connection from component
    disconnect(connection: any) {
        if (connection != null) {
            connection.disconnect();
        }
    }
}