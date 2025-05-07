import React from 'react';
import "./Campaign.css";
import Utils from "./Utils";
import DollarIcon from '@mui/icons-material/AttachMoney';
import { Button, LinearProgress, Box, Tooltip } from '@mui/material';

export default function Campaign({ sumDonations, cntDonations, coin, funcChangeCoin }) {
    const goal = 2000000;
    // חישוב האחוזים
    const percentage = (sumDonations / goal) * 100;

    return (
        <div className="campaign-container">
            {/* הכיתוב בעת מעבר על הכפתור */}
            <Tooltip title="Currency Conversion" arrow>
                {/* הכפתור לשינוי סוג המטבע */}
                <Button className="button" onClick={funcChangeCoin}>
                    {coin.type === 'shekel' ? '₪' : <DollarIcon />}
                </Button>
            </Tooltip>
            {/* כמות התורמים */}
            <p className="count">Number of Donors: {cntDonations}</p>
            {/* יעד הקמפיין */}
            <p className="goal">Campaign Goal: {Utils(goal, coin)}</p>
            {/* סכום התרומות עד עתה */}
            <p className="donations">Total Donations: {Utils(sumDonations, coin)}</p>
            {/* קו הזז ע"פ אחוז התרומות מהיעד */}
            <Box sx={{ width: '50%', margin: '20px auto', position: 'relative' }}>
                <LinearProgress variant="determinate" value={percentage} className="LinearProgress" />
                <div className="percentage">
                    {percentage.toFixed(2)}%
                </div>
                <div className="LinearProgress-circle" style={{ left: `${percentage}%` }}></div>
            </Box>
        </div>
    );
}

