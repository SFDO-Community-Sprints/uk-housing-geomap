# AHA GeoMap

# Project Name

AHA GeoMap

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

### Configuration Properties

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

This is it.

---

BELOW CONTENT TO USE TO CREATE YOUR FIRST WIKI PAGE TO HOUSE DETAILS ABOUT YOUR SPRINT PARTICIPATION.

1. Cut the below from the readme and paste into a new Wiki page. Delete these instructions.
2. Update that wiki page with details from the Sprint.
3. Copy that format for the next Sprint.

# Sprint (2026):

## Project Team & Accomplishments

- Initial LWC component built and published to the SFDO Community Sprints organisation
- Supports compound geolocation, separate lat/lon, and text address data sources
- Fully configurable via Lightning App Builder with no Apex required

## Contributors

| Full Name        | Team Role    | Github Username                                 | Working Group? |
| ---------------- | ------------ | ----------------------------------------------- | -------------- |
| Etienne de Klerk | Group Leader | [Etienne-SFDO](https://github.com/Etienne-SFDO) |

## Future Contributions

- Perhaps fetch the co-ordinates from a related record?
- any ideas share them with us :)
