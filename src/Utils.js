// פונקציית המרה משקל לדולר ע"פ סוג המטבע
export default function Utils(num, coin) {
        return coin.type == "shekel" ? num : Math.round(num / coin.dollarRate);
}