function MandatoryTagsEvaluator() {
 this.a = "b";
}

MandatoryTagsEvaluator.prototype.trial = function () {
  console.log("trial");
};

module.exports = MandatoryTagsEvaluator;