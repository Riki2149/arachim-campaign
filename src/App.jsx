import { useState } from 'react'
import './App.css'
import Campaign from './Campaign'
import ToDonate from './ToDonate'
import ListDonations from './ListDonations'
import NavBar from './NavBar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import * as React from 'react';


function App() {
  // מערך התורמים
  let [donations, setDonations] = useState(getArrFromStorage);
  // כמות התורמים  
  let [cnt, setCnt] = useState(localStorage.getItem("cnt") || 0);
  // סכום התרומות הכולל
  let [sum, setsum] = useState(localStorage.getItem("sum") || 0);
  // סוג המטבע + שער הדולר
  const [coin, setCoin] = useState({ type: "shekel", dollarRate: 3.5 });
  // ניווט לדף אחר
  const navigate = useNavigate();


  // עדכון שער הדולר מהשרת
  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/6281cf1fc4438704dccc1742/latest/USD")
      .then(res => res.json()).then(data => {
        console.log(data.conversion_rates.ILS);
        setCoin({ ...coin, dollarRate: data.conversion_rates.ILS });
      }).catch(err => { console.log(err) })
  }, []);
  // פונקציית הוספת תרומה למערך התרומות
  function addDonate(donate) {
    const newCnt = parseInt(cnt) + 1;
    // עדכון המזהה של התרומה
    donate.id = newCnt;
    // עדכון מספר התורמים
    setCnt(newCnt);
    localStorage.setItem("cnt", newCnt);
    // עדכון סכום התרומות
    const newSum = parseInt(sum) + donate.sumDonate;
    setsum(newSum);
    localStorage.setItem("sum", newSum);

    let copy = [...donations, donate];
    setDonations(copy);
    //  שמירה לוקאלית
    localStorage.setItem("arrDonations", JSON.stringify(copy))
    // העברה לעמוד רשימת התרומות
    navigate('/Donations');
  }

  // פונקציית עדכון מערך התרומות=לקיחתו מהשמירה הלוקאלית
  function getArrFromStorage() {
    let arr = localStorage.getItem("arrDonations");
    arr = JSON.parse(arr);
    if (!arr)
      arr = [];
    return arr;
  }

  // פונקצייה לעדכון סוג המטבע בעת לחיצה על שינוי סוג המטבע
  function changeTypeCoin() {
    setCoin({ ...coin, type: coin.type == "shekel" ? "dollar" : "shekel" })
  };

  return (
    <>
      {/* קומפוננטת הקישורים + הלוגו */}
      <NavBar />
      <div className="background-image"></div>
      <div className='component'>
        {/* קומפוננטת סיכום הקמפיין */}
        <Campaign sumDonations={sum} cntDonations={cnt} coin={coin} funcChangeCoin={changeTypeCoin} />
      </div>
      {/* מעבר הדפים ע"י הקישורים */}
      <Routes>
        <Route path="ToDonate" element={<ToDonate addFunc={addDonate} coin={coin} />} />
        <Route path="Donations" element={<ListDonations arrDonations={donations} coin={coin} />} />
      </Routes>
    </>
  )

}

export default App
