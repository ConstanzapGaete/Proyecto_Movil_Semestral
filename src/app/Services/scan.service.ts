import { Injectable } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat,
} from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
  constructor() {}

  async Scannear() {
    try {
      // Check permissions
      const permission = await BarcodeScanner.checkPermissions();
      if (permission.camera !== 'granted') {
        await BarcodeScanner.requestPermissions();
      }

      // Start scanning
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode],
      });

      if (barcodes.length > 0) {
        console.log('Scan result:', barcodes[0].rawValue);
        return barcodes[0].rawValue;
      } else {
        throw new Error('No barcode detected');
      }
    } catch (error) {
      console.error('Scanning error:', error);
      throw error;
    }
  }
}
