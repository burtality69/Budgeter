var clsBudgetModel = function (DateParser) {

  function clsBudgetModel(Month, Description, Amount) {
    this.Month = Month || undefined,
    this.Description = Description || undefined,
    this.Amount = Amount || undefined
  }

  clsBudgetModel.build = function(data) {
 
    return new clsBudgetModel (
      Month = DateParser.getUTCDate(data.Month).toLocaleDateString('en-US'),
      Description = data.Description,
      Amount = data.Amount
    )}

    return clsBudgetModel;

};

clsBudgetModel.$inject =['DateParser'];
