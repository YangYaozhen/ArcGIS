import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    loadModules([
      'esri/Map',
      'esri/views/MapView'
    ])
      .then(([EsriMap, EsriMapView]) => {
        const mapProperties: esri.MapProperties = {
          basemap: 'streets-navigation-vector'
        };

        const m: esri.Map = new EsriMap(mapProperties);

        const mapViewProperties: esri.MapViewProperties = {
          container: this.mapViewEl.nativeElement,
          center: [0.1278, 51.5074],
          zoom: 10,
          map: m
        };

        const mapView: esri.MapView = new EsriMapView(mapViewProperties);
      })
      .catch(err => {
        console.error(err);
      });
  }

}
