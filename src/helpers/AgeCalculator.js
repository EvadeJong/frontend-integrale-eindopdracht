import React from 'react';


function AgeCalculator(info){

    const current = new Date();
    const birthDate = new Date(info);
    const ageInSeconds = current - birthDate;
    const age = Math.floor(ageInSeconds/1000/60/60/24/365);

    if(age < 18){
        return true;
    }else{
        return false;
    }
}

export default AgeCalculator