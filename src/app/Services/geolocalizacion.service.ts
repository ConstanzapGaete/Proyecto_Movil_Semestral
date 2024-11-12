import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private baseUrl: string = 'https://nominatim.openstreetmap.org/reverse';

  constructor() {}

  async getLocation(lat: number, lon: number): Promise<string> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          lat,
          lon,
          format: 'json',
          addressdetails: 1,
        },
      });

      const { address } = response.data;
      const country = address.country || 'Desconocido';
      const comuna = address.city || address.neighborhood || 'Sin comuna';
      return ` ${comuna}, ${country}`;
    } catch (error) {
      console.error('Error buscando localizacion:', error);
      return 'Ubicación no encontrada';
    }
  }
}
