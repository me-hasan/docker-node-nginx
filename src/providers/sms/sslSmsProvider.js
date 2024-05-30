import axios from 'axios';
import config from '../../config/index.js';
class SslSmsProvider {
    API_TOKEN = config.sms.api;
    SID = config.sms.sid;
    DOMAIN = config.sms.doamin;

    sendSingleSms = async (msisdn, messageBody, csmsId) => {
        const params = {
            api_token: this.API_TOKEN,
            sid: this.SID,
            msisdn,
            sms: messageBody,
            csms_id: csmsId
        };

        const url = `${this.DOMAIN}/api/v3/send-sms`;
        return this.callApi(url, params);
    }

    sendBulkSms = async (msisdns, messageBody, batchCsmsId) => {
        const params = {
            api_token: this.API_TOKEN,
            sid: this.SID,
            msisdn: msisdns,
            sms: messageBody,
            batch_csms_id: batchCsmsId
        };

        const url = `${this.DOMAIN}/api/v3/send-sms/bulk`;
        return this.callApi(url, params);
    }

    sendDynamicSms = async (messageData) => {
        const params = {
            api_token: this.API_TOKEN,
            sid: this.SID,
            sms: messageData
        };

        const url = `${this.DOMAIN}/api/v3/send-sms/dynamic`;
        return this.callApi(url, params);
    }

    callApi = async (url, params) => {
        try {
            const response = await axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error making API call', error);
            throw error;
        }
    }
}

export default SslSmsProvider;
