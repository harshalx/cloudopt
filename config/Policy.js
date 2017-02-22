var Policy = {
    mandatoryTag: "Deployment", //case sensitive. Instance will terminated mistakenly if case is not correct.
    mandatoryTagExpiryDuration: 10, //the # of days after which an instance will be subjected to action if it fails mandatory
                                    //tags check.
    instanceTerminationPolicy: "Stop" //Other value "Terminate" which will terminate the offending instance instead of stopping
  };

module.exports = Policy;
