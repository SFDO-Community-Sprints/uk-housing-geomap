# AHA GeoMap
<img width="538" height="355" alt="image" src="https://github.com/user-attachments/assets/2e30e882-580d-4ccb-9243-a49fcb2e75b5" />


# Project Overview
Salesforcre provides the _lightning-map_ component as part of the platform, but does not ship a ready-made Lightning Web Component (LWC) that puts it on a record page. 
Additionally, none of the components I found provided flexibility to use lat/lon co-ordinate data sources.

## Vision & Goals
A reusable Salesforce (LWC) to display location data on any Salesforce record page. Designed to work with the variety of geolocation data patterns such as  — compound geolocation field (lat,lon), separate lat/lon fields, or standard text address fields (default).

- Display a map marker on any record page with zero Apex code
- Support multiple coordinate data sources: compound geolocation field, separate lat/lon fields, and text address fields (geocoded by Google Maps)
- Configurable entirely through Lightning App Builder — no code changes required

## Project Vertical

All verticals
(Originally created for Housing / Nonprofit / Public Sector)

## Trailblazer Group or Slack Channel Link (access required)

Join the conversation in the `#aha-geomap` Slack channel.

## Installation

### Prerequisites

- Salesforce CLI (`sf`) v2 or later — [install guide](https://developer.salesforce.com/tools/salesforcecli)
- A Salesforce org (sandbox, scratch org, or production — use scratch orgs for testing)

### Deploy from Source

```bash
# 1. Clone this repository
git clone https://github.com/SFDO-Community-Sprints/uk-housing-geomap.git
cd uk-housing-geomap

# 2. Authenticate to your target org
sf org login web --alias my-housing-org

# 3. Deploy the component
sf project deploy start --source-dir force-app --target-org my-housing-org
```

### Using a Scratch Org (recommended for testing)

```bash
# Create a scratch org
sf org create scratch --definition-file config/project-scratch-def.json --alias aha-geomap-scratch --duration-days 7

# Deploy
sf project deploy start --source-dir force-app --target-org aha-geomap-scratch

# Open the org
sf org open --target-org aha-geomap-scratch
```

## Using the Component

After deployment, open **Lightning App Builder** on any record page, find **AHA Dynamic Geo Map** in the component list, and drag it onto the page.

<img width="266" height="380" alt="image" src="https://github.com/user-attachments/assets/97ec8a64-9e6a-407e-8ce8-6a8252079896" />


### Configuration Properties

<img width="287" height="847" alt="image" src="https://github.com/user-attachments/assets/566c240e-00b0-4312-8917-d7aae8a872a9" />

| Property                          | Description                                                                                                                                                                   | Default                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Card Title**                    | Text displayed in the header of the map card                                                                                                                                  | `Location Map`           |
| **Card Icon**                     | SLDS icon shown in the card header (e.g. `utility:location`). Browse icons at [lightningdesignsystem.com](https://www.lightningdesignsystem.com) > Foundations > Icon Library | `standard:map_line_item` |
| **Zoom Level**                    | Map zoom 1–20. 1 = world view, 14 = street level, 20 = building level                                                                                                         | `14`                     |
| **Location Data Source**          | How the component finds location data — `address` (recommended), `separate`, or `compound`                                                                                    | `address`                |
| **Street Field API Name**         | API name of the street field, e.g. `MailingStreet`, `BillingStreet`, or a custom field                                                                                        | `MailingStreet`          |
| **City Field API Name**           | API name of the city/town field, e.g. `MailingCity`                                                                                                                           | `MailingCity`            |
| **County / State Field API Name** | API name of the county or state field, e.g. `MailingState`                                                                                                                    | `MailingState`           |
| **Postcode Field API Name**       | API name of the postcode/zip field, e.g. `MailingPostalCode`                                                                                                                  | `MailingPostalCode`      |
| **Country Field API Name**        | API name of the country field, e.g. `MailingCountry`                                                                                                                          | `MailingCountry`         |
| **Latitude Field API Name**       | _(Source: separate)_ Numeric latitude field, e.g. `BillingLatitude` or `MailingLatitude`                                                                                      | `BillingLatitude`        |
| **Longitude Field API Name**      | _(Source: separate)_ Numeric longitude field, e.g. `BillingLongitude` or `MailingLongitude`                                                                                   | `BillingLongitude`       |
| **Geolocation Field API Name**    | _(Source: compound)_ A custom Salesforce Geolocation field type, e.g. `Location__c`                                                                                           | `Location__c`            |

### Location Data Source Modes

- **address** _(recommended)_ — uses text address fields; the map component geocodes the address to a pin via Google Maps directly in the browser. No Salesforce configuration required. Works on any object with address fields.
- **separate** — uses two numeric Latitude and Longitude fields. Standard objects like Account (`BillingLatitude`/`BillingLongitude`) and Contact (`MailingLatitude`/`MailingLongitude`) have these fields built in, but they are **not populated automatically** — an admin must enable geocoding in Setup > Data > Geocodes. See [Salesforce geocoding documentation](https://help.salesforce.com/s/articleView?id=sales.data_dot_com_clean_admin_automatically_get_geocodes_for_addresses.htm&type=5). Salesforce Field Service Service Appointments also include `Latitude` and `Longitude` fields, which SFS populates automatically when scheduling. You can also populate lat/lon fields via a Flow, Apex, or data import.
- **compound** — uses a custom Salesforce [Geolocation field type](https://help.salesforce.com/s/articleView?id=sf.custom_field_geolocate_overview.htm) (e.g. `Location__c`). This field is created by an admin in Setup > Object Manager and must be populated manually, via a Flow, Apex, or data import — Salesforce does not populate it automatically.

## How to Contribute

- Fork this repository, create a feature branch, and submit a pull request
- Test your changes against a scratch org before submitting
- See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidance

## Project Resources and Documentation

You are reading it

## Mapping Options in Salesforce Explained

When working with maps in the Salesforce ecosystem, the terminology can get confusing quickly. To clarify how this project fits into the bigger picture, here is a breakdown of the different mapping tools available:

* **LWC `<lightning-map>` (This Component)**
  This is the modern, standard Lightning Web Component provided out-of-the-box by Salesforce, and it is what this project uses. It is a fully functional JavaScript component powered by Google Maps. It handles all the heavy lifting—like rendering tiles, plotting pins, and managing user zoom—with very little code. It is the best practice for building new, custom mapping features on record pages.

    You can view the [official LWC documentation here](https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-map.html?type=Develop).

* **Aura `<lightning:map>`**
  This is the exact same functional mapping engine as the LWC version, but it is built for the older, legacy Aura framework. While it still works and is supported, you should avoid using it for new development. Modern Salesforce development (like this repository) relies exclusively on LWC.

* **SLDS Map Blueprints**
  The Salesforce Lightning Design System (SLDS) map is **not** a functional map; it is strictly a CSS and HTML blueprint. It provides the visual styling (the borders, the layout, the buttons) to make things look like native Salesforce. You only use SLDS blueprints if you are importing an existing map or building a highly customized mapping engine from scratch using a third-party JavaScript library (like Leaflet or Mapbox) and want it to match the Salesforce UI. 

    You can view the [SLDS Map blueprints here](https://v1.lightningdesignsystem.com/components/map/).

* **Salesforce Maps**
  Unlike the free, standard `<lightning-map>` component used in this repository, **Salesforce Maps** is a premium, paid add-on product (formerly known as MapAnything). It is a massive, complex application designed for territory management, route optimization for field sales, and plotting millions of records simultaneously. If you just need to show a handful of dynamic locations on a record page, this project's LWC approach is what you need.
