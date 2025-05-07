import { useState } from "react"
import './ToDonate.css'

export default function ToDonate({ addFunc, coin }) {
    // אובייקט תרומה
    let [donate, setDonate] = useState({
        id: "",
        name: "",
        sumDonate: "",
        dedication: "",
        date: ""
    });
    // אובייקט שגיאות
    let [myErrors, setMyErrors] = useState({})

    // פונקציית בדיקת תקינות הערכים שהוקשו
    function validate() {
        let err = {};
        if (donate.name.length < 2)
            err.name = "The name must contain at least 2 letters"
        else if (!/^[a-zA-Zא-ת\s]{2,}$/.test(donate.name))
            err.name = "The name can contain only English and Hebrew letters"
        if (donate.sumDonate <= 0 || !/^[0-9]+$/.test(donate.sumDonate))
            err.sumDonate = "The donation amount must be a positive number"
        return err;
    }

    // פונקציית שמירת הערכים שהוקשו באובייקט התרומה
    function change(e) {
        let { name, type, value } = e.target
        let copy = { ...donate };
        if (type == "number")
            value = value === "" ? "" : +value;
        copy[name] = value;
        setDonate(copy);
    }

    // פונקציית שמירת התרומה
    // ושליחתה לפונקציית הוספת התרומה למערך התרומות בעת ארוע שליחת הטופס 
    function save(e) {
        e.preventDefault();
        let copy = { ...donate };
        if (coin.type == "dollar")
            copy.sumDonate = Math.round(copy.sumDonate * coin.dollarRate)
        copy.date = new Date()
        setDonate(copy)
        let result = validate()
        // בדיקה אם אובייקט השגיאות ריק 
        if (Object.keys(result).length == 0) {
            addFunc(copy);
            // איפוס אובייקט התרומה
            setDonate({
                name: "",
                sumDonate: "",
                dedication: "",
                date: ""
            })
            // איפוס אובייקט השגיאות
            setMyErrors({
                name: "",
                sumDonate: ""
            })
        }
        else
            // אחרת הצגת השגיאות
            setMyErrors(result);
    }


    return (
        <>
            {/* טופס הקשת פרטי התרומה */}
            <form className="form-container" onSubmit={save}>
                {/* שם */}
                <div class="form-field">
                    <label>name: </label>
                    <input type="text" name="name" id="" onChange={change} value={donate.name} />
                    {myErrors.name && <div style={{ color: "red" }}>{myErrors.name}</div>}
                </div>
                {/* סכום התרומה */}
                <div className="form-field">
                    <label> sum to donate: </label>
                    <input type="number" name="sumDonate" id="" onChange={change} value={donate.sumDonate} />
                    {myErrors.sumDonate && <div style={{ color: "red" }}>{myErrors.sumDonate}</div>}
                </div>
                {/* הקדשה */}
                <div className="form-field">
                    <label> dedication: </label>
                    <textarea name="dedication" id="" cols="30" rows="10" onChange={change} value={donate.dedication}></textarea>
                    {/* כפתור השליחה */}
                    <input className="submit" type="submit" name="submit" value={"I want to donate"} />
                </div>
            </form>
        </>
    )
}