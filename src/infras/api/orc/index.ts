import Axios from 'Axios';
import {API_URL_GET_HIGHLIGHTS} from './urls';

export default class ORCService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.VITE_BASE_API_URL || '';
    }

    getHighlights = (imageName: string) => {
        return Axios({
            url: `${this.baseUrl}/${API_URL_GET_HIGHLIGHTS}`,
            method: 'POST',
            data: {
                image_name: imageName,
            },
        });
    };
}
