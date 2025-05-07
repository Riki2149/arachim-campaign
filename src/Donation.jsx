import Utils from "./Utils";

export default function Donation({ donate, coin }) {
    function showDate() {
        const diffTime = new Date() - new Date(donate.date);
        const diffSeconds = diffTime / 1000; // שניות
        const diffMinutes = diffSeconds / 60; // דקות
        const diffHours = diffMinutes / 60; // שעות
        const diffDays = diffHours / 24; // ימים

        // הצגת התוצאה בהתאם להפרש בזמן
        let result;
        if (diffDays >= 1) {
            result = `${Math.floor(diffDays)} days`;
        } else if (diffHours >= 1) {
            result = `${Math.floor(diffHours)} hours`;
        } else if (diffMinutes >= 1) {
            result = `${Math.floor(diffMinutes)} minutes`;
        } else {
            result = `${Math.floor(diffSeconds)} seconds`;
        }

        return result;
    }

    return (
        <>
            {/* הצגת תרומה בודדת */}
            {/* שם התורם */}
            <h1>name: {donate.name}</h1>
            {/* סכום התרומה (שליחה לפונקציית המרת הסכום ע"פ סוג המטבע) */}
            <h2>sumDonate: {Utils(donate.sumDonate, coin)}</h2>
            {/* הקדשה */}
            <p>dedication: {donate.dedication}</p>
            {/* לפני כמה זמן התבצעה התרומה */}
            <p>donate before: {showDate()}</p>
        </>
    )
}