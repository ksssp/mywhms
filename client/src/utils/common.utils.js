
const moment = require ( 'moment' );

export default {
    prettyPrintDate(inputDateTime) {
        if(inputDateTime == undefined || inputDateTime == null) {
            return "";
        } else {
            return moment.defaultFormat();
        }
    }
}