var AWS = require('aws-sdk');
var policyConfig = require('./config/Policy.js');
var promise = require('promise');
var Q = require('q');
var moment = require('moment');



AWS.config.update({region:'us-west-2'});
AWS.config.setPromisesDependency(Q.Promise);

var ses = new AWS.SES();

var params = {
  Destination: { /* required */
    ToAddresses: [
      'harshalx@gmail.com',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Text: {
        Data: 'Hello', /* required */
      }
    },
    Subject: { /* required */
      Data: 'Hello', /* required */
    }
  },
  Source: 'Satish.Mane@aeris.net', /* required */
  SourceArn: 'arn:aws:ses:us-west-2:248971149884:identity/Satish.Mane@aeris.net',
  
  Tags: [
    {
      Name: 'trial', /* required */
      Value: 'trial' /* required */
    },
    /* more items */
  ]
};
ses.sendEmail(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

/*
var dt = new Date();
var today = dt.getFullYear() + "-" + (dt.getMonth() +1) + "-" + dt.getDate();
var nextmonth = "2017-03-01";

var dt2 = "Fri Feb 17 2017 06:05:51 GMT-0500 (EST)";
var dt3 = "Fri Feb 27 2017 06:05:51 GMT-0500 (EST)";

var end = moment(nextmonth, "YYYY-M-DD");
var start = moment(today, "YYYY-M-DD");

console.log("today=" + today);
console.log("nxtm=" + nextmonth);

console.log(end.diff(start, 'days'));
*/

//main
//InstanceHelper.describeTags(ec2Instance);
//module.exports = InstanceHelper;
