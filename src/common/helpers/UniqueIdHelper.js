import { Investor } from '../../models/investor.js';
export class UniqueIdHelper {
    static generateNumericId() {
        // Generate a random numeric ID between 100000 and 999999
        return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    }

    static async isNumericIdExists(numericId) {
        const idAsString = String(numericId);
        const count = await Investor.count({
            where: { investor_tracking_id: idAsString }
        });
        return count > 0;
    }
    

    static async generateUniqueId() {
        let numericId;
        do {
            numericId = UniqueIdHelper.generateNumericId();
        } while (await UniqueIdHelper.isNumericIdExists(numericId));

        return numericId;
    }
}

