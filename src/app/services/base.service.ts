import { HttpHeaders } from '@angular/common/http';

export class BaseService {

    protected getHttpHearders(): HttpHeaders {
        const headers: HttpHeaders = new HttpHeaders();

        headers.append('Content-Type', 'application/json');
        const jwt: string = localStorage.getItem('id_token');
        if (jwt) {
            headers.append('Authorization', `Bearer ${jwt}`);
        }
        
        return headers;
    }
}