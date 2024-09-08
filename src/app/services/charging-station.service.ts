import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargingStation } from 'app/features/charging-stations/model/charging-station.model';

@Injectable({
  providedIn: 'root'
})
export class ChargingStationService {
  private apiUrl = 'http://134.255.177.102:8080/cp/charging-stations'; // charging points

  constructor(private http: HttpClient) { }

  getChargingStations(): Observable<ChargingStation[]> {
    return this.http.get<ChargingStation[]>(this.apiUrl);
  }

  getChargingStation(id: number): Observable<ChargingStation> {
    return this.http.get<ChargingStation>(`${this.apiUrl}/${id}`);
  }

  createChargingStation(station: ChargingStation): Observable<ChargingStation> {
    return this.http.post<ChargingStation>(`${this.apiUrl}`, station);
  }

  updateChargingStation(station: ChargingStation): Observable<ChargingStation> {
    return this.http.put<ChargingStation>(`${this.apiUrl}/${station.id}`, station);
  }

  deleteChargingStation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}