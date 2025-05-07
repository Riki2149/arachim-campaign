import Donation from "./Donation";
import { yellow } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { Grid, Paper, TextField, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import "./ListDonations.css";



export default function ListDonations({ arrDonations, coin }) {
   // ערך הבחירה של המיון (ברירת מחדל-מיון ע"פ הישן)
   const [typeSort, setTypeSort] = useState('sortByOld');
   // מערך למיון
   const [sortedDonations, setSortedDonations] = useState([...arrDonations]);
   // ערך תיבת הטקסט
   const [inputValue, setInputValue] = useState("");

   // הצגת רשימת התרומות בעת טעינת הדף
   useEffect(() => {
      setSortedDonations(arrDonations);
   }, [arrDonations]);

   // פונקציית מיון בעת ארוע בחירה
   function startSort(e) {
      const NewTypeSort = e.target.value;
      setTypeSort(NewTypeSort);
      let sortedArr = [...sortedDonations];
      if (NewTypeSort === 'sortByOld') {
         sortedArr.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      else if (NewTypeSort === 'sortByNew') {
         sortedArr.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (NewTypeSort === 'sortByDonationAmount') {
         sortedArr.sort((a, b) => b.sumDonate - a.sumDonate);
      }
      // עדכון המערך הממוין
      setSortedDonations(sortedArr);
   }


   // פונקציית שמירת הערך שהוקש לחיפוש בעת הקלדה והצגת התרומות ע"פ הערך שהוקש
   function changeValue(e) {
      const value = e.target.value
      setInputValue(value)
      // אם תיבת הטקסט ריקה, להחזיר את כל התרומות
      if (value === "") {
         setSortedDonations(arrDonations);
      } else {
         // חיפוש התרומות המתאימות לערך שהוקש                          
         const findDonations = arrDonations.filter(donate =>
            donate.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            donate.dedication.toLowerCase().includes(inputValue.toLowerCase())
         );
         // עדכון המערך הממוין ברשימה שהתקבלה מהחיפוש
         setSortedDonations(findDonations);
      }
   }


   return (
      <>
         {/* סידור העמוד באמצעות גריד של ספריית MUI */}
         <Grid container spacing={2} direction="column" alignItems="center">
            {/* סידור כפתורי הבחירה באמצעות גריד של ספריית MUI */}
            <Grid item container justifyContent="center" spacing={2}>
               <Grid item>
                  {/* כפתורי הבחירה של סוג המיון */}
                  <RadioGroup value={typeSort} onChange={startSort} row>
                     {/* מיון ע"פ הישן */}
                     <FormControlLabel
                        value="sortByOld"
                        control={<Radio sx={{ color: yellow[600], '&.Mui-checked': { color: yellow[600] } }} />}
                        label="Sort by Old"
                     />
                     {/* מיון ע"פ החדש */}
                     <FormControlLabel
                        value="sortByNew"
                        control={<Radio sx={{ color: yellow[600], '&.Mui-checked': { color: yellow[600] } }} />}
                        label="Sort by New"
                     />
                     {/* מיון ע"פ גובה התרומות */}
                     <FormControlLabel
                        value="sortByDonationAmount"
                        control={<Radio sx={{ color: yellow[600], '&.Mui-checked': { color: yellow[600] } }} />}
                        label="Sort by Donation Amount"
                     />
                  </RadioGroup>
               </Grid>
            </Grid>
            {/* סידור תיבת הטקסט להקשה באמצעות גריד של ספריית MUI */}
            <Grid item xs={12}>
               {/* סידור תיבת הטקסט להקשה באמצעות ספריית NUI */}
               <Box
                  component="form"
                  sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
                  noValidate
                  autoComplete="off"
               >
                  {/* תיבת הטקסט להקשה */}
                  <TextField
                     id="filled-basic"
                     label="Search by Name or Dedication"
                     variant="filled"
                     value={inputValue}
                     onChange={changeValue}
                     sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                  />
               </Box>
            </Grid>

            {/* סידור רשימת התרומות באמצעות גריד של ספריית MUI */}
            <Grid item container spacing={2} justifyContent="center">
               {/* מעבר על המערך הממוין להצגה  */}
               {sortedDonations.map(item => {
                  return (
                     // סידור תרומה בודדת באמצעות גריד של ספריית MMU
                     <Grid item xs={12} sm={4} md={3} key={item.id}>
                        {/* סידור כרטיסי התרומות עם מרווחים באמצעות ספריית MUI */}
                        <Paper
                           elevation={3}
                           sx={{ padding: '16px', backgroundColor: yellow[100], borderRadius: '8px' }}
                        >
                           {/*  קומפוננטת הצגת תרומה בודדת*/}
                           <Donation donate={item} coin={coin} />
                        </Paper>
                     </Grid>
                  );
               })};
            </Grid>
         </Grid>
      </>
   );
}
