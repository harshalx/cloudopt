var instanceHelper = require('../helpers/InstanceHelper.js');
var policyConfig = require('../config/Policy.js');
var expiryDurationPolicyConfig = require('../config/ExpiryDurationPolicy.js');
var moment = require('moment');

var ec2Instance = {
      //InstanceId: "i-0319833a04f4a2993", 
      InstanceId: "i-01454cb7198a7c0bc",
      LaunchTime: "Tue Sep 22 2017 00:00:00 GMT-0400 (EDT)"
    };
//Evaluates the instance for notifications to be sent out to the users periodically
function NotificationsEvaluator() {
  function evaluate(instance) {
    if(instance.daysToExpiry<=7) {
      
    }
  }
}

//main
//new NotificationsEvaluator().evaluate(ec2Instance);
  
module.exports = NotificationsEvaluator;