import axios from 'axios';

export default axios.create({
    baseURL: 'http://vpn.implementacionesi.com.ar:4834/api',
});
