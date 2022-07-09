import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';
import AuthContextProvider from "../../../context/AuthContext";
import SubmitJokeForm from "../submitJoke/SubmitJokeForm";

it(
    '17. Bij inzenden van een grap is het verplicht om een categorie mee te geven',
    async () => {
        render(
            <MemoryRouter>
                <AuthContextProvider>
                    <SubmitJokeForm/>
                </AuthContextProvider>
            </MemoryRouter>
        );
        await act(async () => {
            userEvent.click(
                screen.queryByRole('button', /Submit Joke/)
            );
        });
        expect(screen.getByText('You must specify a subject')).toBeTruthy();
    }
);

it(
    '18. Bij inzenden van een grap is het verplicht om een type mee te geven',
    async () => {
        render(
            <MemoryRouter>
                <AuthContextProvider>
                    <SubmitJokeForm/>
                </AuthContextProvider>
            </MemoryRouter>
        );
        await act(async () => {
            userEvent.click(
                screen.queryByRole('button', /Submit Joke/)
            );
        });
        expect(screen.getByText('You must specify a joke type')).toBeTruthy();
    }
);

it(
    '19. Bij inzenden van een grap is het niet verplicht om een eventuele uitsluiting mee te geven (racistisch, seksistisch, religieus, politiek, niet geschikt voor werkomgeving, seksueel)',
    async () => {
        render(
            <MemoryRouter>
                <AuthContextProvider>
                    <SubmitJokeForm/>
                </AuthContextProvider>
            </MemoryRouter>
        );
        expect(screen.getByTestId('jokeFlagSelector')).not.toHaveAttribute('required');
    }
);

it(
    '20. Bij inzenden van een grap moet de Engelse taal gebruikt worden',
    async () => {
        render(
            <MemoryRouter>
                <AuthContextProvider>
                    <SubmitJokeForm/>
                </AuthContextProvider>
            </MemoryRouter>
        );
        var textAreaArray = screen.queryAllByRole('textbox');
        textAreaArray.forEach(element => {
            expect(element).toHaveAttribute('spellCheck', 'true');
            expect(element).toHaveAttribute('lang', 'en');    
        }); 
    }
);

it(
    '21. Als type enkelvoudig is geselecteerd, moet de gebruiker het joke veld invullen',
    async () => {
        render(
            <MemoryRouter>
                <AuthContextProvider>
                    <SubmitJokeForm/>
                </AuthContextProvider>
            </MemoryRouter>
        );
    }
);
