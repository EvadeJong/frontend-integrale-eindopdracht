import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RequestJoke from './RequestJoke';
import { ChickenJokeSeenContext } from '../../context/ChickenJokeSeenContext';
import { AuthContext } from '../../context/AuthContext';


it(
    '16. Als geregistreerde gebruiker onder de 18 jaar kan je enkel grappen ontvangen die beschouwd worden als geschikt voor alle leeftijden,',
    async() => {
        const testChickenJokeSeenContext = {
            isChickenJokeSeen: false
        }
        const testAuthContextData = {
            user: {
                info: '21-2-1982'
            }
        } 
        render(
            <MemoryRouter>
                <AuthContext.Provider value={testAuthContextData}>
                    <ChickenJokeSeenContext.Provider value={testChickenJokeSeenContext}> 
                        <RequestJoke/>
                    </ChickenJokeSeenContext.Provider>
                </AuthContext.Provider>
            </MemoryRouter>
        );        
    }
)