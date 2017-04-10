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
    console.log("ActionsEvaluator::Enter");
    if (instance.expired === true) {
      console.log("ActionsEvaluator::stopping..")
      if (policyConfig.instanceTerminationPolicy == "Stop") {
        instanceHelper.stopInstances([instance.InstanceId]);
      }
      else if (policyConfig.instanceTerminationPolicy == "Terminate") {
        console.log("ActionsEvaluator::Terminating..");
        instanceHelper.terminateInstances([instance.InstanceId]);
      }
  }
}
}

//main
//new NotificationsEvaluator().evaluate(ec2Instance);
  
module.exports = ActionsEvaluator;