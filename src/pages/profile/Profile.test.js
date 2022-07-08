import { render, screen } from '@testing-library/react'
import { queryByAttribute  } from '@testing-library/dom'

import Profile from './Profile';
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

export const queryById = queryByAttribute.bind(
    null,
    'id',
);

it('10. Als geregistreerde gebruiker kan je jouw profiel aanpassen', async() => {
    const testContextData = {
        user: {
            username: "expectedUsername",
            email: "expected@expected.expected",
            info : "21-2-1982"
        }
    }
    render(
        <MemoryRouter>
            <AuthContext.Provider value={testContextData}>
                <Profile />
            </AuthContext.Provider>
        </MemoryRouter>
    );
    expect(screen.getByTestId('inputUsername')).toHaveAttribute('value', testContextData.user.username);
    expect(screen.getByTestId('inputEmail')).toHaveAttribute('value', testContextData.user.email);
    expect(screen.getByTestId('inputDoB')).toHaveAttribute('value', testContextData.user.info);
});

it('11. De geboorte datum op de profielpagina is niet aanpasbaar', async() => {
    const testContextData = {
        user: {
            username: "expectedUsername",
            email: "expected@expected.expected",
            info : "21-2-1982"
        }
    }
    render(
        <MemoryRouter>
            <AuthContext.Provider value={testContextData}>
                <Profile />
            </AuthContext.Provider>
        </MemoryRouter>
    );
    expect(screen.getByTestId('inputDoB')).toHaveAttribute('disabled');
});