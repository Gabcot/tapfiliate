# tapfiliate
NPM package for the tapfiliate package. 

A fork of the tapfiliate-package found here: https://www.npmjs.com/package/tapfiliate-package


## Usage
Install this package
```npm i tapfiliate```

Load package into the file
```cont Tapfiliate = require('tapfiliate');```

Initialize the object by passing the API Key as a parameter
```const tapfiliate = Tapfiliate('<api-key>');```


## Tapfiliate API
This is a bridge between a NodeJS application and the Tapfiliate API. The current API version used is Tapfiliate `1.6`.

## Functions
All the functions return a promise. To use the await keyword, these functions must be called in an async function. The regular `.then( )` syntax can also be used in a synchronous context.
```
// Create Affiliate
await tapfiliate.createAffiliate(firstName, lastName, email, password);

// Add Affiliate to Program
await tapfiliate.addAffiliateToProgram(affiliateID, programID, approved);

// Create New Conversion
await tapfiliate.createConversion(visitorID, externalID, commissionType);

// Add Commission to conversion
await tapfiliate.addCommissionToConversion(conversionID, commissionAmount, commissionType);
```

*Note: All parameters are required.*