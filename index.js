const request = require('request');

module.exports = Tapfiliate

/**
 *
 * @param apiKey    API Key of tapfiliate account
 * @constructor
 */
function Tapfiliate(apiKey) {
    this.base_url = "https://api.tapfiliate.com/1.6/"
    this.headers = {
        'Api-Key': apiKey
    }
}

/**
 *  Intializes the object of tapfiliate with API key
 *
 * @param firstName     First name of the User
 * @param lastName      Last Name of the User
 * @param email         Email Address of the User
 * @param password      Password for the user login on tapfiliate
 * @returns             Promise 
 */

Tapfiliate.prototype.createAffiliate = function (firstName, lastName, email, password) {
    return new Promise(function(resolve, reject){

        const formData = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        }

        var options = {
            url: this.base_url + "affiliates/",
            headers: this.headers,
            json: formData
        }
    
        request.post(options, function callback(err, httpResponse, body) {
            if (httpResponse.statusCode == 200) {
                resolve(body);
            } else {
                reject(err);
            }
        })
    });
}


/**
 *
 * @param visitorID         Unique Visitor ID
 * @param externalID        Unique User ID for cross verification of conversions
 * @param amount            Amount
 * @param commissionType    Commission type as on tapfiliate dashboard
 * @returns                 Promise 
 */
Tapfiliate.prototype.createConversion = function (visitorID, externalID, commissionType) {
    return new Promise(function(resolve, reject){

        const formData = {
            visitor_id: visitorID,
            external_id: externalID,
            amount: 0.0,
            commission_type: commissionType
        }

        var options = {
            url: this.base_url + "conversions/",
            headers: this.headers,
            json: formData
        }

        request.post(options, function (err, httpResponse, body) {
            if (httpResponse.statusCode === 200) {
                resolve(body);
            } else {
                reject(err);
            }
        })
    });
}

/**
 *
 * @param conversionID          Conversion ID, stored when creating the conversion
 * @param commissionAmount      Commission Amount on which the commission will be calculated
 * @param commissionType        Commission type as in tapfiliate dashboard
 * @returns                     Promise 
 *                              Response Success Array:
 *                              {
 *                                error: false,
 *                                commission_sub_amount: 500
 *                                amount: 1.25,
 *                                approved: null
 *                              }
 *
 *                              Response Failed:
 *                              {
 *                                error: true,
 *                                message: Parameters are not correct
 *                              }
 */
Tapfiliate.prototype.addCommissionToConversion = function (conversionID, commissionAmount, commissionType) {
    return new Promise(function(resolve, reject){

        const url = "conversions/" + conversionID + "/commissions/";

        const formData = {
            conversion_sub_amount: commissionAmount,
            commission_type: commissionType
        }

        var options = {
            url: this.base_url + url,
            headers: this.headers,
            json: formData
        }

        request.post(options, function (err, httpResponse, body) {
            if (httpResponse.statusCode === 200) {
                resolve(body);
            } else {
                reject(err);
            }
        })
    });
}

/**
 * This function adds affiliate to Program
 * @param affiliateID   Affiliate ID that was received when created affiliate
 * @param programID     Program ID in which you want to add affiliate
 * @param approved      True | false
 * @returns             Promise 
 */
Tapfiliate.prototype.addAffiliateToProgram = function (affiliateID, programID, approved) {
    return new Promise(function(resolve, reject){

        const url = "programs/" + programID + "/affiliates/"

        const formData = {
            affiliate: {
                id: affiliateID
            },
            approved: approved
        }

        // Set Options with FormData, headers and url
        var options = {
            url: this.base_url + url,
            headers: this.headers,
            json: formData
        }

        request.post(options, function callBack(err, httpResponse, body) {
            if (httpResponse.statusCode == 200) {
                resolve(body);
            } else {
                reject(err);
            }
        })
    });
}

