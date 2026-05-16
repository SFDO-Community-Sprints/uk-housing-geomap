import { LightningElement, api, wire, track } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

export default class AhaGeoMap extends LightningElement {
  // Context
  @api recordId;
  @api objectApiName;

  // Design Attributes
  @api cardTitle;
  @api cardIcon;
  @api zoomLevel;
  @api sourceMode; // 'compound', 'separate', or 'address'

  // Field Configs
  @api compoundFieldName;
  @api latFieldName;
  @api lonFieldName;
  @api streetField;
  @api cityField;
  @api stateField;
  @api postalCodeField;
  @api countryField;

  @track mapMarkers = [];
  error;
  isLoading = true;

  get fieldsToQuery() {
    if (!this.objectApiName) return [];

    if (this.sourceMode === "compound") {
      return [
        `${this.objectApiName}.${this.compoundFieldName.replace("__c", "")}__Latitude__s`,
        `${this.objectApiName}.${this.compoundFieldName.replace("__c", "")}__Longitude__s`,
        `${this.objectApiName}.Name`
      ];
    } else if (this.sourceMode === "separate") {
      return [
        `${this.objectApiName}.${this.latFieldName}`,
        `${this.objectApiName}.${this.lonFieldName}`,
        `${this.objectApiName}.Name`
      ];
    } else if (this.sourceMode === "address") {
      return [
        `${this.objectApiName}.${this.streetField}`,
        `${this.objectApiName}.${this.cityField}`,
        `${this.objectApiName}.${this.stateField}`,
        `${this.objectApiName}.${this.postalCodeField}`,
        `${this.objectApiName}.${this.countryField}`,
        `${this.objectApiName}.Name`
      ];
    }
    return [];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fieldsToQuery" })
  wiredRecord({ error, data }) {
    this.isLoading = false;
    if (data) {
      this.processData(data);
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.mapMarkers = [];
    }
  }

  processData(data) {
    let locationData = {};
    const name = data.fields.Name?.value || "Record Location";

    if (this.sourceMode === "compound") {
      const baseName = this.compoundFieldName.replace("__c", "");
      locationData = {
        Latitude: data.fields[`${baseName}__Latitude__s`]?.value,
        Longitude: data.fields[`${baseName}__Longitude__s`]?.value
      };
    } else if (this.sourceMode === "separate") {
      locationData = {
        Latitude: data.fields[this.latFieldName]?.value,
        Longitude: data.fields[this.lonFieldName]?.value
      };
    } else if (this.sourceMode === "address") {
      locationData = {
        Street: data.fields[this.streetField]?.value,
        City: data.fields[this.cityField]?.value,
        State: data.fields[this.stateField]?.value,
        PostalCode: data.fields[this.postalCodeField]?.value,
        Country: data.fields[this.countryField]?.value
      };
    }

    const hasCoords = locationData.Latitude && locationData.Longitude;
    const hasAddress =
      locationData.City || locationData.Street || locationData.PostalCode;

    if (hasCoords || hasAddress) {
      this.mapMarkers = [
        {
          location: locationData,
          title: name,
          description: this.getDescription(locationData),
          icon: this.cardIcon
        }
      ];
    } else {
      this.mapMarkers = [];
    }
  }

  getDescription(loc) {
    if (loc.Latitude) return `Coords: ${loc.Latitude}, ${loc.Longitude}`;
    return `${loc.City || ""}, ${loc.Country || ""}`;
  }

  get isMapReady() {
    return this.mapMarkers.length > 0;
  }

  get showNoDataMessage() {
    return !this.isLoading && !this.error && this.mapMarkers.length === 0;
  }

  get errorMessage() {
    return this.error?.body?.message || "Unknown error";
  }
}
