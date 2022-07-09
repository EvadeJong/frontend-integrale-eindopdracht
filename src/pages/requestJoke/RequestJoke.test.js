import { render,screen, act, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';
import axios from "axios";

import RequestJoke from './RequestJoke';
import { ChickenJokeSeenContext } from '../../context/ChickenJokeSeenContext';
import { AuthContext } from '../../context/AuthContext';

afterEach(() => {
    cleanup();
})

it(
    '16. Als geregistreerde gebruiker onder de 18 jaar kan je enkel grappen ontvangen die beschouwd worden als geschikt voor alle leeftijden,',
    async() => {
        // Arrange
        const axiosResponse = {
            data: {
                "error": false,
                "category": "Programming",
                "type": "single",
                "joke": "\"Knock, knock.\"\n\"Who's there?\"\n\n[very long pause]\n\n\"Java.\"",
                "flags": {
                    "nsfw": false,
                    "religious": false,
                    "political": false,
                    "racist": false,
                    "sexist": false,
                    "explicit": false
                },
                "id": 36,
                "safe": true,
                "lang": "en"
            }
        };

        const testChickenJokeSeenContext = {
            isChickenJokeSeen: true
        };

        const testAuthContextData = {
            user: {
                info: '2018-01-02'
            }
        };

        axios.get = jest.fn().mockResolvedValue(axiosResponse);
        render(
            <MemoryRouter>
                <AuthContext.Provider value={testAuthContextData}>
                    <ChickenJokeSeenContext.Provider value={testChickenJokeSeenContext}> 
                        <RequestJoke/>
                    </ChickenJokeSeenContext.Provider>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        // Act
        await act( async () => {
            userEvent.click(
                screen.getByText('I want another joke')
            );
        });
        // Assert
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("?safe-mode"));
    }
);