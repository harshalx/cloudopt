var AWS = require('aws-sdk');
var instanceHelper = require('../helpers/InstanceHelper.js');
var policyConfig = require('../config/Policy.js');

AWS.config.update({region:'us-west-2', apiVersion: 'latest'});

var ec2Instance = {
      //InstanceId: "i-0319833a04f4a2993", 
      InstanceId: "i-01454cb7198a7c0bc",
      LaunchTime: "Tue Sep 22 2017 00:00:00 GMT-0400 (EDT)"
 };

//Evaluates the instance for notifications to be sent out to the users periodically
function ActionsEvaluator() {
  
  ActionsEvaluator.prototype.evaluate = function(instance) {
    if (instance.expired === true) {
      
    } else {
      
    }
  }
}

//main
//new NotificationsEvaluator().evaluate(ec2Instance);
  
module.exports = ActionsEvaluator;