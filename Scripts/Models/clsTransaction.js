﻿budgeterModels.factory('ClsTransaction',['clsTransactionValue',function (clsTransactionValue) {

    /*** Constructor, with class name*/
    function ClsTransaction(ID, Name, TransactionValues, TypeDescription,TypeID, UserID ) {
        // Public properties, assigned to the instance ('this')
        this.ID = ID || undefined,
        this.Name = Name || undefined,
        this.TypeDescription = TypeDescription || undefined,
        this.TypeID = TypeID || undefined,
        this.TransactionValues = TransactionValues || [new clsTransactionValue()]
        this.UserID = UserID || undefined,
        this.message = undefined || undefined,
        this.expanded = false;
    }

    /*** Static method, assigned to class* Instance ('this') is not available in static context*/
    ClsTransaction.build = function (data) {

        return new ClsTransaction (
            ID = data.ID,
            Name = data.Name,
            TransactionValues = data.TransactionValues.map(clsTransactionValue.build),
            TypeDescription = data.TypeDescription,
            TypeID = data.TypeID,
            UserID = data.UserID,
            message = undefined,
            editable = false,
            expanded = false
            )
    };

    /*** Return the constructor function*/
    return ClsTransaction;
}]);

