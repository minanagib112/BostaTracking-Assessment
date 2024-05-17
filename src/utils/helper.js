import * as constants from '../utils/constants';

export function currentPercentage(events){
    
    for (let index = events.length-1; index >= 0 ; index--) {
        switch (events[index]['state']) {
            case 'TICKET_CREATED':
                return constants.PERCENTAGES[0];
            case 'PACKAGE_RECEIVED':
                return constants.PERCENTAGES[1];
            case 'OUT_FOR_DELIVERY':
                return constants.PERCENTAGES[2];
            case 'IN_TRANSIT':
                return constants.PERCENTAGES[2];
            case 'DELIVERED':
                return constants.PERCENTAGES[3];
            // default:
            //    return constants.PERCENTAGES[0]; 
        }
        
        
    }
    
}

export function GetReason(events){
    for (let index = events.length-1; index >= 0 ; index--) {
        if(events[index]['reason']!=null){
            return events[index]['reason']
        }
    }
    return null;
}