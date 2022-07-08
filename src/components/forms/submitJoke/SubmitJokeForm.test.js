import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import AuthContextProvider from "../../../context/AuthContext";
import SubmitJokeForm from "../submitJoke/SubmitJokeForm";


it(
    '17. Bij inzenden van een grap is het verplicht om een categorie mee te geven,',
    async () => {
        render(
            <MemoryRouter>
                <AuthContextProvider>
                    <SubmitJokeForm/>
                </AuthContextProvider>
            </MemoryRouter>
        );
        expect(screen.queryByTestId('jokeAboutSelector')).toHaveAttribute('required');
    }
)