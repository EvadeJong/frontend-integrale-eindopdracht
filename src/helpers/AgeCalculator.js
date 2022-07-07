import React from 'react';

function AgeCalculator(info){

    const current = new Date();
    const birthDate = new Date(info);
    if(isNaN(birthDate)) {
        return true;
    } else {
        const ageInSeconds = current - birthDate;
        const age = Math.floor(ageInSeconds / 1000 / 60 / 60 / 24 / 365);
        return age < 18 ? true : false;
    }
}

export default AgeCalculator