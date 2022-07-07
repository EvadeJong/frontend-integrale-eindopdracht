import React, {createContext, useEffect, useState} from 'react'

export const ChickenJokeSeenContext = createContext({});

function ChickenJokeSeenProvider({children}){
    const [isChickenJokeSeen, setIsChickenJokeSeen] = useState(false)

    useEffect(()=> {
        const chickenSeen = localStorage.getItem('isChickenSeen');
        if (chickenSeen !== null || undefined) {
            setIsChickenJokeSeen(chickenSeen === 'true');
        }
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