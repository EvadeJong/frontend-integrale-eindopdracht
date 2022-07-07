import React, {createContext, useEffect, useState} from 'react'

export const ChickenJokeSeenContext = createContext({});

function ChickenJokeSeenProvider({children}){
    const [isChickenJokeSeen, setIsChickenJokeSeen] = useState(false)

    useEffect(()=> {
        const chickenSeen = localStorage.getItem('isChickenSeen');
        if (chickenSeen) {
            console.log('chickenseen: ' + chickenSeen)
            setIsChickenJokeSeen(chickenSeen);
        }
        console.log('ischickenseen: ' + isChickenJokeSeen)
    }, []);

    function toggleChickenJokePage(data){
        setIsChickenJokeSeen(data);
        localStorage.setItem('isChickenSeen', data);
    }

    const chickenContextData = {
        toggleChickenJoke: toggleChickenJokePage,
        isChickenJokeSeen: isChickenJokeSeen,
    }

    return(
        <ChickenJokeSeenContext.Provider value={chickenContextData}>
            {children}
        </ChickenJokeSeenContext.Provider>
    )
}

export default ChickenJokeSeenProvider;