// this file is to prepare jsons for upload
const lodgementRepository = require ('../../repositories/lodgement.repository');
var fs = require('fs');

lodgementRepository.getCarryForwardLodgements().then(response => {
    let carryForwardLodgements = JSON.parse(JSON.stringify(response));

    // create a lotNumberToLodgementMap for easy access
    carryForwardLodgements.forEach(lodgement => {

        lodgementRepository.getLodgementById(lodgement.carryForward.originalLodgementId).then(response => {
            let originalLodgement = JSON.parse(JSON.stringify(response));
            originalLodgement.carryForward.hasCarryForwardLot = true;
            originalLodgement.carryForward.carryForwardLotNumber = lodgement.lotNumber;
            originalLodgement.carryForward.carryForwardLodgementId = lodgement._id;
            originalLodgement.carryForward.numBagsCarryForward = lodgement.numBagsLodged;

            lodgementRepository.updateLodgement(originalLodgement._id, originalLodgement).then(response => {
                console.log('saved lotNumber : ', originalLodgement.lotNumber, response);
            });

            fs.appendFile('../sampleData/carryForwardLodgements.json', JSON.stringify(originalLodgement) + ', ', 'utf8', function(err) {
                if (err) throw err;
            });
        });
    });
});
