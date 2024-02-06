import {Step} from '../Models/Step.js';

export class DBAssistant{
    static getRecord(table, id){

    }
    static getRecords(table, column, sharedValue){
        var result = [];
        if(table == "Step"){
            result = Step.getDummyPreparationSteps();
        }

        return result;
    }
}