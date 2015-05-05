budgeterModels.factory('clsTransactionValue',['dateParser',function (dateParser) {

  function clsTransactionValue(ID, TransactionID, Value, FrequencyID, FrequencyDescription, Day, Start_date, End_date) {
      // Public properties, assigned to the instance ('this')
      this.ID = ID,
      this.TransactionID = TransactionID,
      this.Value = Value,
      this.FrequencyID = FrequencyID,
      this.FrequencyDescription = FrequencyDescription,
      this.Day = Day,
      this.Start_date = Start_date || new Date(),
      this.End_date = End_date || new Date(),
      this.editable = false,
      this.expanded = false
  }

  clsTransactionValue.build = function (data) {

      return new clsTransactionValue (
          ID = data.ID,
          TransactionID = data.TransactionID,
          Value = data.Value,
          FrequencyID = data.FrequencyID,
          FrequencyDescription = data.FrequencyDescription,
          Day = data.Day,
          Start_date = dateParser.getUTCDate(data.Start_date),
          End_date = dateParser.getUTCDate(data.End_date),
          editable = false,
          expanded = false
    );
  };

  clsTransactionValue.prototype.formatforApi = function () {
    return {
      ID: this.ID,
      TransactionID: this.TransactionID,
      Value: this.Value,
      FrequencyID: this.FrequencyID,
      Day: this.Day,
      Start_date: this.Start_date.toLocaleDateString('en-US'),
      End_date: this.End_date.toLocaleDateString('en-US')
    };
  };

    return clsTransactionValue;
    
}]);
