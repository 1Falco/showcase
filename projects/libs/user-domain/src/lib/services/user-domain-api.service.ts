import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { GUID } from '../types/guid.type';

const MOCK_USER: IUser = {
  active: true,
  name: 'Jake',
  surname: 'Kowalski',
  registeredAt: new Date(),
  connectedWith: [],
  id: 'dasdasdha-12312312=4534563453' as GUID,
};

@Injectable({
  providedIn: 'root',
})
export class UserDomainApiService {
  constructor(private http: HttpClient) {}

  getUserData(): Observable<IUser> {
    return of(MOCK_USER).pipe(
      take(1),
      map((response) => <IUser>response)
    );
  }
}
