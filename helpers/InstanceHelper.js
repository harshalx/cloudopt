var AWS = require('aws-sdk');
var policyConfig = require('../config/Policy.js');
var promise = require('promise');



AWS.config.update({region:'us-west-2'});
var ec2 = new AWS.EC2();

/*var InstanceHelper = {
  describeTags: function describeTags(instance) {
       var params = {
            Filters: [
             {
              Name: "resource-type", 
              Values: [
                "instance"
              ],               
             },
             {
               Name: "resource-id",
               Values: []
             },
             {
               Name: "key",
               Values: []
             }
          ]
      }; 
        
    params.Filters[1].Values[0] = instance.InstanceId;
    params.Filters[2].Values[0] = policyConfig.mandatoryTag;
    ec2.describeTags(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
     //console.log("InstanceHelper::tags.length=" + data.Tags.length); 
     return data; 
     });
    
   }  
}*/

var ec2Instance = {
      //InstanceId: "i-0319833a04f4a2993", 
      InstanceId: "i-01454cb7198a7c0bc",
      LaunchTime: "Tue Sep 22 2015 00:00:00 GMT-0400 (EDT)"
    };



var InstanceHelper = {  
  describeTags: function describeTags(instance) {
    var dTagsPromise;   
    var params = {
            Filters: [
             {
              Name: "resource-type", 
              Values: [
                "instance"
              ],               
             },
             {
               Name: "resource-id",
               Values: []
             },
             {
               Name: "key",
               Values: []
             }
          ]
      }; 
        
    params.Filters[1].Values[0] = instance.InstanceId;
    params.Filters[2].Values[0] = policyConfig.mandatoryTag;
    
    return new Promise(function (resolve, reject) {
    dTagsPromise = ec2.describeTags(params).promise();
     dTagsPromise.then( function(data) {       
       //console.log(data);           // successful response
       //console.log("ec2 returned");
       resolve(data);
       //console.log("InstanceHelper::tags.length=" + data.Tags.length);      
     }).catch( function(err) {
        console.log(err, err.stack); // an error occurred
        reject(err);
     });
    });
  },
  
  stopInstance: function stopInstance(instance) {
    
  }
}

//main
/*InstanceHelper.describeTags(ec2Instance).then(
  function(val) {
    console.log("tags");
    console.log(val);
  }
);*/
//console.log("exit");
module.exports = InstanceHelper;