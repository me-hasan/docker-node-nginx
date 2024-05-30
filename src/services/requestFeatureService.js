import moment from 'moment-timezone';
import AuthServiceError from '../common/helpers/ThrowError.js';
import AlertStockPriceMst from '../models/alertStockPriceMst.js';
import AlertStockPriceChd from '../models/alertStockPriceChd.js';
import CompanyInfoMst from '../models/companyInfoMst.js';
import ImdsMkIstats from '../models/imdsMkIstats.js';
import sequelize from '../database/db.js';
import RequestFeature from '../models/requestFeature.js';
import Investor from '../models/investor.js';
import RequestFeatureVote from '../models/requestFeatureVote.js';
import pkg from 'lodash';
const { trim } = pkg;


export const storeRequestFeature = async (investorId, requestData) => {
    try {
        const { title, description } = requestData;

        // Check if a request feature already exists for the given investor and title
        const existingFeature = await RequestFeature.findOne({
            where: { created_by: investorId, title: title }
        });

        if (existingFeature) {
            // Return an error message if the feature already exists
            return "Request feature already exists!";
        }

        // Create a new request feature
        const feature = await RequestFeature.create({
            title: title,
            description: description,
            created_by: investorId,
            status: 0 // Assuming status 1 means active
        });

        await RequestFeatureVote.create({
            investor_id: investorId,
            request_feature_id: feature.id,
            vote_status: 1
        });

        // Return a success message
        return "Request feature created successfully!";
    } catch (error) {
        // Handle any errors that occur during database operations
        console.error('Error in storeRequestFeature:', error);
        throw new Error('Failed to store request feature', error);
    }
};


export const fetchRequestFeatureByFilter = async (investorId, filter = 'newest') => {
    try {
        const featureData = await RequestFeature.findAll({
            include: [
                { model: Investor, as: 'createdByInvestor' },
                // { model: RequestFeatureVote, as: 'requestFeatureVotes', where: { investor_id: investorId }, required: false }
                { model: RequestFeatureVote, as: 'requestFeatureVotes', required: false }
            ], where: { status: 1 }
        });

        const transformedData = featureData.map(feature => {
            const ownVote = feature.requestFeatureVotes.find(vote => vote.vote_status === 1);
            const ownVoteStatus = !!ownVote;
            const {
                id,
                title,
                description,
                created_at,
                createdByInvestor,
                requestFeatureVotes
            } = feature;

            const fullName = trim(createdByInvestor?.name);

            return {
                Id: id,
                UserName:  fullName ? fullName : createdByInvestor?.email,
                ProfilePic: createdByInvestor?.profile_path || '',
                PostCreatedAt: created_at,
                FeatureTitle: title,
                FeatureDescription: description,
                OwnVoteStatus: ownVoteStatus,
                VoteCount: requestFeatureVotes.filter(vote => vote.vote_status === 1).length
            };
        });

        let sortedData;
        if (filter === 'oldest') {
            sortedData = transformedData.sort((a, b) => new Date(a.PostCreatedAt) - new Date(b.PostCreatedAt));
        } else {
            sortedData = transformedData.sort((a, b) => new Date(b.PostCreatedAt) - new Date(a.PostCreatedAt));
            if (filter === 'newest' || filter === 'popular') {
                sortedData = sortedData.sort((a, b) => b.VoteCount - a.VoteCount);
            }
        }

        return sortedData;

    } catch (error) {
        // Handle errors gracefully
        console.error('Error in fetchRequestFeatureByFilter:', error);
        return { status: 'Error', message: 'Internal Server Error', data: [] };
    }
};




export const voteRequestFeatureData = async (investorId, featureId) => {
    let transaction;
    try {
        // Check if the feature vote already exists
        const existingFeatureVote = await RequestFeatureVote.findOne({
            where: { request_feature_id: featureId, investor_id: investorId },
        });

        if (!existingFeatureVote) {
            // Create a new feature vote if it doesn't exist
            await RequestFeatureVote.create({
                investor_id: investorId,
                request_feature_id: featureId,
                vote_status: 1
            });
            return "Feature voted successfully!";
        } else {
            // Toggle the vote status if the feature vote already exists
            transaction = await sequelize.transaction();

            const newVoteStatus = existingFeatureVote.vote_status ? 0 : 1;
            const newVoteStatusLabel = !existingFeatureVote.vote_status;

            await RequestFeatureVote.update(
                { vote_status: newVoteStatus },
                { where: { request_feature_id: featureId, investor_id: investorId }, transaction }
            );

            // Commit the transaction
            await transaction.commit();

            return `Vote status toggled successfully. New status: ${newVoteStatusLabel}`;
        }
    } catch (error) {
        // Rollback the transaction on error
        if (transaction) await transaction.rollback();

        // Handle errors
        console.error('Error in voteRequestFeatureData:', error);
        throw new Error('Failed to vote for the feature', error);
    }
};








