import { Injectable } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  constructor() {}

  async Scannear() {
    let cameraDirection = 1;
    if (Capacitor.getPlatform() === 'web') {
      cameraDirection = undefined;
    }

    try {
      const data = await CapacitorBarcodeScanner.scanBarcode({
        hint: 17,
        cameraDirection: cameraDirection,
      });
      console.log('Data', data);
      return data.ScanResult;
    } catch (error) {
      throw error;
    }
  }
}
