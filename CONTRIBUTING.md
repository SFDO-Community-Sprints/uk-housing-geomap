# Contributing to AHA UK Housing GeoMap

Thank you for contributing to the Affordable Housing Accelerator! Here's how to get started.

## Prerequisites

- [Salesforce CLI v2](https://developer.salesforce.com/tools/salesforcecli)
- [Node.js](https://nodejs.org/) (LTS recommended)
- A Salesforce Dev Hub org (for scratch orgs)

## Setup

```bash
# Clone and install dependencies
git clone https://github.com/SFDO-Community-Sprints/uk-housing-geomap.git
cd uk-housing-geomap
npm install
```

## Development Workflow

```bash
# Create a scratch org
sf org create scratch --definition-file config/project-scratch-def.json --alias aha-dev --duration-days 7

# Deploy the component
sf project deploy start --source-dir force-app --target-org aha-dev

# Open the org to test in Lightning App Builder
sf org open --target-org aha-dev
```

## Running Tests

```bash
# Lint
npm run lint

# Unit tests
npm test

# Tests with coverage
npm run test:unit:coverage
```

## Submitting a Pull Request

1. Create a branch from `main`: `git checkout -b feature/your-feature-name`
2. Make your changes and verify lint + tests pass locally
3. Deploy to a scratch org and test in Lightning App Builder
4. Submit a PR with a clear description of what changed and why
