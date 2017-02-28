var AWS = require('aws-sdk');
var nunjucks = require('nunjucks');

AWS.config.update({region:'us-west-2'});

var ses = new AWS.SES();

function EmailHelper() {
  this.noOfDays;
  this.sesParams = {
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
}

}

EmailHelper.prototype.sendEmail = function(instance) {
 console.log("EmailHelper::instance=" + JSON.stringify(instance));
 nunjucks.configure("./email-templates", { autoescape: true });
  var obj = {instanceId : instance.InstanceId, 
             days : (instance.daysToExpiry < 0) ? (instance.daysToExpiry * -1) : instance.daysToExpiry };
  var email;
  if( instance.daysToExpiry > 0) {
   email = 
     nunjucks.render("alreadyExpiredNotification.txt", obj); 
  }else
   email = 
     nunjucks.render("expiryNotification.txt", obj);
 //set message body
 this.sesParams.Message.Body.Text.Data = email;
 //set message subject
 var subj = 
     nunjucks.renderString("Instance {{ instanceId }} is about to expire", {instanceId: instance.InstanceId});
 //console.log("subj=" + subj);
 this.sesParams.Message.Subject.Data = subj;
  
 ses.sendEmail(this.sesParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
 });
 
}

//main

var ec2Instance = {
      //InstanceId: "i-0319833a04f4a2993", 
      InstanceId: 'i01454cb7198a7c0bc',
      LaunchTime: "Tue Sep 22 2017 00:00:00 GMT-0400 (EDT)",
      daysToExpiry: 2
    };

//new EmailHelper().sendEmail(ec2Instance);
module.exports = EmailHelper;