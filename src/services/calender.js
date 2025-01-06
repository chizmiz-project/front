import {toPersianDigits} from './Utils'

function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);

    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return 'لحظاتی پیش';
    } else if (minutes < 60) {
        return `${toPersianDigits(minutes)} دقیقه پیش`;
    } else if (hours < 24) {
        return `${toPersianDigits(hours)} ساعت پیش`;
    } else {
        return `${toPersianDigits(days)} روز پیش`;
    }
};

export default timeAgo;