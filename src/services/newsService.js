import { Op } from 'sequelize';
import AuthServiceError from '../common/helpers/ThrowError.js';
import sequelize from '../database/db.js';
import ScrapCompanyNews from '../models/ScrapCompanyNews.js';
import moment from 'moment-timezone';



export const showAllNewsType = async () => {
    try {
      const newsTypes = await ScrapCompanyNews.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('news_type')), 'news_type']]
       });
  
      // Transform the data into the desired format
      const transformedData = newsTypes.map((news) => {
        return {
          type: news.news_type,
        };
      });
  
      return transformedData;
    } catch (error) {
      console.error('Error fetching news types:', error);
      throw error;
    }
  };


  export const showDisplayNewsOnSearchPage = async (tradeCode, newsType, days) => {
    try {
        const currentDate = moment().format('YYYY-MM-DD');
        const pastDate = moment().subtract(days, 'days').format('YYYY-MM-DD');

        const newsTypes = await ScrapCompanyNews.findAll({
            attributes: ['id', 'title', 'news_link', 'news_date', 'news_source', 'news_image_link', 'description', 'news_type'],
            where: {
              [Op.or]: [
                  { trade_code: { [Op.in]: tradeCode } },
                  { news_type: { [Op.in]: newsType } }
              ],
              news_date: {
                  [Op.gte]: pastDate
              }
            }
        });

        // Transform the data into the desired format
        const transformedData = newsTypes.map((news) => ({
            uuid: news.id,
            title: news.title,
            link: news.news_link,
            dateTime: news.news_date,
            image: news.news_image_link,
            details: news.description,
            source: news.news_source,
            type: news.news_type,
        }));

        return transformedData;
    } catch (error) {
        console.error('Error fetching news types:', error);
        throw error;
    }
};


export const showNewDetails = async (uuid) => {
  try {
      const newsDetails = await ScrapCompanyNews.findOne({
          attributes: ['id', 'title', 'news_link', 'news_date', 'news_source', 'news_image_link', 'description', 'news_type'],
          where: {
              id: uuid
          }
      });

      if (!newsDetails) {
          return null; // or handle as needed, e.g., throw an error
      }

      // Transform the data into the desired format
      const transformedData = {
          uuid: newsDetails.id,
          title: newsDetails.title,
          link: newsDetails.news_link,
          dateTime: newsDetails.news_date,
          image: newsDetails.news_image_link,
          details: newsDetails.description,
          source: newsDetails.news_source,
          type: newsDetails.news_type,
      };

      return transformedData;
      
  } catch (error) {
      console.error('Error fetching news details:', error);
      throw new Error('Error fetching news details'); // throw a specific error message
  }
};

export const showSearchingNewsByTradeCode = async (tradeCode) => {
  try {
      
      const newsTypes = await ScrapCompanyNews.findAll({
          attributes: ['id', 'title', 'news_link', 'news_date', 'news_source', 'news_image_link', 'description', 'news_type'],
          where: {
            [Op.or]: [
                { trade_code: { [Op.in]: tradeCode } }
            ]
          }
      });

      // Transform the data into the desired format
      const transformedData = newsTypes.map((news) => ({
          uuid: news.id,
          title: news.title,
          link: news.news_link,
          dateTime: news.news_date,
          image: news.news_image_link,
          details: news.description,
          source: news.news_source,
          type: news.news_type,
      }));

      return transformedData;
  } catch (error) {
      console.error('Error fetching news types:', error);
      throw error;
  }
};

export const showSearchingNewsByDayWise = async (days) => {
  try {
      const currentDate = moment().format('YYYY-MM-DD');
      const pastDate = moment().subtract(days, 'days').format('YYYY-MM-DD');
      const newsTypes = await ScrapCompanyNews.findAll({
        attributes: ['id', 'title', 'news_link', 'news_date', 'news_source', 'news_image_link', 'description', 'news_type'],
        where: {
            news_date: {
                [Op.gte]: pastDate
            }
        }
    });

      // Transform the data into the desired format
      const transformedData = newsTypes.map((news) => ({
          uuid: news.id,
          title: news.title,
          link: news.news_link,
          dateTime: news.news_date,
          image: news.news_image_link,
          details: news.description,
          source: news.news_source,
          type: news.news_type,
      }));

      return transformedData;
  } catch (error) {
      console.error('Error fetching news types:', error);
      throw error;
  }
};


export const showSearchingNewsBySource = async (newsSource) => {
  try {
      const newsTypes = await ScrapCompanyNews.findAll({
        attributes: ['id', 'title', 'news_link', 'news_date', 'news_source', 'news_image_link', 'description', 'news_type'],
        where: {
          news_source: { [Op.in]: newsSource },
        }
    });

      // Transform the data into the desired format
      const transformedData = newsTypes.map((news) => ({
          uuid: news.id,
          title: news.title,
          link: news.news_link,
          dateTime: news.news_date,
          image: news.news_image_link,
          details: news.description,
          source: news.news_source,
          type: news.news_type,
      }));

      return transformedData;
  } catch (error) {
      console.error('Error fetching news types:', error);
      throw error;
  }
};


export const showAllNewsSource = async () => {
  try {
    const newsSource = await ScrapCompanyNews.findAll({
          attributes: [[sequelize.fn('DISTINCT', sequelize.col('news_source')), 'news_source']]
     });

    // Transform the data into the desired format
    const transformedData = newsSource.map((news) => {
      return {
        type: news.news_source,
      };
    });

    return transformedData;
  } catch (error) {
    console.error('Error fetching news types:', error);
    throw error;
  }
};















