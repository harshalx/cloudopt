var instanceHelper = require('../helpers/InstanceHelper.js');
var policyConfig = require('../config/Policy.js');
var expiryDurationPolicyConfig = require('../config/ExpiryDurationPolicy.js');
var moment = require('moment');

var ec2Instance = {
      //InstanceId: "i-0319833a04f4a2993", 
      InstanceId: "i-01454cb7198a7c0bc",
      LaunchTime: "Tue Sep 22 2017 00:00:00 GMT-0400 (EDT)"
    };

function InstanceExpiryEvaluator() {}
//evaluates whether the instance has expired and if not returns the #of days left for expiry
InstanceExpiryEvaluator.prototype.evaluate = function (instance) {
  //console.log("in evaluate" + instance);  
  //console.log(instance.InstanceId + "," + instance.LaunchTime); 
  var now = moment();
  var launchDt = moment(Date.parse(instance.LaunchTime));
  var targetDt, diff;
  instance.expired = false;
  
  
  if (instance.MandatoryTag === false) { //if the mandatory tag is absent and the diff is -ve mark the instance for expiry.
      // add the # of days the instance is allowed to live.
    targetdt = launchDt.clone().add(10, "days");
    diff = now.diff(targetdt, "days");
    console.log("diff is days=" + diff);  
    
    if(diff > 0) 
      instance.expired = true;
    else {
      instance.expired = false;
      instance.daysToExpiry = (diff * -1);
    }
      

  } else {
    var configuredExpiryDays = expiryDurationPolicyConfig[instance.Tags[0].Value];
    if (configuredExpiryDays === undefined)
       configuredExpiryDays = 10;
    
    //console.log("instance=" + JSON.stringify(instance.Tags[0].Value));
    console.log("Days to be alive=" + configuredExpiryDays);
    //var configuredExpiryDays = expiryDurationPolicyConfig.Development;
    targetDt = launchDt.clone().add(configuredExpiryDays, "days");
    diff = now.diff(targetDt, "days");
    console.log("diff is days=" + diff);  
    
    if(diff > 0) 
      instance.expired = true;
    else {
      instance.expired = false;
      instance.daysToExpiry = (diff * -1);
    }
 } //the else
  console.log("instance=" +  JSON.stringify(instance));
  return instance; 
}//evaluate fn 

//main
//new InstanceExpiryEvaluator().evaluate(ec2Instance);
  
module.exports = InstanceExpiryEvaluator;