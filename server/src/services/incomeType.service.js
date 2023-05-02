const incomeTypeRepository  = require('../repositories/incomeType.repository');

class IncomeTypeService {

    constructor() {}

    async getIncomeTypes() {
        return await incomeTypeRepository.getIncomeTypes();
    }

    async getIncomeTypeById(incomeTypeId) {
        return await incomeTypeRepository.getIncomeTypeById(incomeTypeId);
    }

    async createIncomeType(incomeType) {
        return await incomeTypeRepository.createIncomeType(incomeType);
    }

    async updateIncomeType(incomeTypeId, incomeType) {
        return await incomeTypeRepository.updateIncomeType(incomeTypeId, incomeType);
    }

    async deleteIncomeType(incomeTypeId) {
        return await incomeTypeRepository.deleteIncomeType(incomeTypeId);
    }

}

module.exports = new IncomeTypeService();