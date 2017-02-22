var instanceHelper = require('../helpers/InstanceHelper.js');
var policyConfig = require('../config/Policy.js');

var ec2Instance = {
      //InstanceId: "i-0319833a04f4a2993", 
      InstanceId: "i-01454cb7198a7c0bc",
      LaunchTime: "Tue Sep 22 2015 00:00:00 GMT-0400 (EDT)"
    };

function MandatoryTagsEvaluator() {}
//evaluates whether mandatory tag is present and returns the 
MandatoryTagsEvaluator.prototype.evaluate = function (instance) {
  return new Promise( function( resolve, reject) {
  //console.log("in evaluate" + instance);  
  //console.log(instance.InstanceId + "," + instance.LaunchTime); 
  instanceHelper.describeTags(instance).then(
    function(returnVal) {
      if( returnVal.Tags.length === 0) {
        console.log("MandatoryTagsEvaluator::evaluate =" + instance.InstanceId  + "tag absent");
        instance.MandatoryTag = false;
        instance.Tags = null;
        resolve(instance);
      }
      else {
        console.log("mandatory tag present");
        instance.MandatoryTag = true;
        instance.Tags = returnVal.Tags;
        resolve(instance);
      }
    }
  ).catch(
    function(err) {
      console.log("MandatoryTagsEvaluator::evaluate::" + "error occured" + err);
      reject(err);
    }
  );
  
  }); //the promise
 }; //evaluate fn

//main
/*new MandatoryTagsEvaluator().evaluate(ec2Instance).then(
  function(retVal) { console.log(retVal); }
);*/
  
module.exports = MandatoryTagsEvaluator;