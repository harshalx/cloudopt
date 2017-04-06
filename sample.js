
// Load the SDK and UUID
var AWS = require('aws-sdk');
var promise = require('promise');
var instanceHelper = require('./helpers/InstanceHelper.js');
var MandatoryTagsEvaluator = require('./rule-evaluators/MandatoryTagsEvaluator.js');
var InstanceExpiryEvaluator = require('./rule-evaluators/InstanceExpiryEvaluator.js');
var NotificationsEvaluator = require('./rule-evaluators/NotificationsEvaluator.js');

AWS.config.update({region:'us-west-2', apiVersion: 'latest'});


var ec2 = new AWS.EC2();
var nextToken = null;
//map storing all the running insances brought up in each pass
var runningInstances = [];

//describe the params for 
var params = {
  DryRun: false,
  Filters: [
    {
      Name: 'instance-state-name',
      Values: ['running']
    }
  ],
  InstanceIds: [
    'i-01959d99ce1d19f99',
    'i-01e7eabbd7b2fea06',
    'i-0dc6fb7dd4151471d',
    'i-0ca5284a92cac2692'
  ],
  //MaxResults: 100,
 // NextToken: nextToken
};

var fetchRunningInstances = function() {
  ec2.describeInstances(params,  function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {     
         //console.log(data);           // successful response        
        //list all instance-ids and their launch times
        for( var rcount = 0; rcount < data.Reservations.length; rcount++){
          //console.log("in reservations loop " + rcount);
          for (var icount=0; icount< data.Reservations[rcount].Instances.length; icount++) {
            //console.log("in instances loop " + icount);
            var instance = data.Reservations[rcount].Instances[icount];
            //console.log("instance-id=" + instance.InstanceId);
            //console.log("LaunchTime=" + instance.LaunchTime);
            runningInstances.push ({InstanceId: instance.InstanceId, 
                                   LaunchTime: instance.LaunchTime});
          }
        }
       }


        //call describeInstances again with the changed nextToken
        //change the value of nextToken
        nextToken = data.NextToken;
        //console.log("nextToken=" + nextToken);
        params.NextToken = nextToken;

        if(nextToken == null || nextToken === '' || nextToken == 'undefined') {
          return;
        } else fetchRunningInstances();
     });
}

function evauateRules(instances) {
  var mte = new MandatoryTagsEvaluator();
  var iee = new InstanceExpiryEvaluator();
  var ne = new NotificationsEvaluator();
  
  for(var count=0; count < runningInstances.length; count++) {
     var instance = runningInstances[count];
     mte.evaluate(instance).then(
      function (retVal) {        
        instance = iee.evaluate(retVal);
        //console.log("post iee" + JSON.stringify(instance));
        ne.evaluate(instance);
      }
     );
    //console.log("before ne" + JSON.stringify(instance));
     
  }
}
 
//callback hell
//there is no way you can get at the end of the control so you keep polling after 2 secs
var sleep = function() {
  setTimeout(function() {
          if(nextToken == null || nextToken === '' || nextToken == 'undefined') {
            console.log("runningInstances final=" + runningInstances.length);
            evauateRules();
          } else sleep();
        }, 2000);
  console.log("timeout expired");
}

//main
fetchRunningInstances();
sleep();
console.log("exiting");