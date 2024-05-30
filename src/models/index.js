import db from "../database/db.js";
import Investor from "./investor.js";
import InvestorOtp from "./investorOtp.js";

// Here, you can also add any associations, e.g.,
Investor.hasMany(InvestorOtp, { foreignKey: 'investor_id', localKey : 'uuid', as: 'investorOtps' });
InvestorOtp.belongsTo(Investor, { foreignKey: 'investor_id', localKey : 'uuid' });

export { db, Investor, InvestorOtp };