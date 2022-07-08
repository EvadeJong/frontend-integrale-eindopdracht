import { act, cleanup, render } from '@testing-library/react'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import App from './App'
import AuthContextProvider, { AuthContext } from './context/AuthContext';

afterEach(() => {
    cleanup();
})

it('4. Als niet-geregistreerde gebruiker heb je geen toegang tot de giggler pagina', async () => {
    // Arrange
    const history = createMemoryHistory({forceRefresh:true});
    render(
        <Router history={history}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Router>
    )
    // Act
    act(() => {
        history.push('/RequestJoke')
    });
    // Assert
    expect(history.location.pathname).toBe("/");
});

it('5. Als niet-geregistreerde gebruiker heb je geen toegang tot de joker pagina', async () => {
    // Arrange
    const history = createMemoryHistory({forceRefresh:true});
    render(
        <Router history={history}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Router>
    )
    // Act
    act(() => {
        history.push('/submitJoke')
    });
    // Assert
    expect(history.location.pathname).toBe("/");
});

it('6. Als niet-geregistreerde gebruiker heb je geen toegang tot de profiel pagina', async () => {
    // Arrange
    const history = createMemoryHistory({forceRefresh:true});
    render(
        <Router history={history}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Router>
    )
    // Act
    act(() => {
        history.push('/Profile')
    });
    // Assert
    expect(history.location.pathname).toBe("/");
});

it('7. Als niet-geregistreerde gebruiker kan je je registreren', async () => {
    // Arrange
    const history = createMemoryHistory({forceRefresh:true});
    render(
        <Router history={history}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Router>
    )
    // Act
    act(() => {
        history.push('/Login')
    });
    // Assert
    expect(history.location.pathname).toBe("/Login");
});

it('8. Als niet-geregistreerde gebruiker kan je contact opnemen', async () => {
    // Arrange
    const history = createMemoryHistory({forceRefresh:true});
    render(
        <Router history={history}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Router>
    )
    // Act
    act(() => {
        history.push('/Contact')
    });
    // Assert
    expect(history.location.pathname).toBe("/Contact");
});

it('9. Als geregistreerde gebruiker kan je inloggen', async () => {
    // Arrange
    const history = createMemoryHistory({forceRefresh:true});
    const testContextData = {
        isAuth: true,
        user: {
            username: "test"
        }
    }
    render(
        <Router history={history}>
            <AuthContext.Provider value={testContextData}>
                <App />
            </AuthContext.Provider>
        </Router>
    )
    // Act
    act(() => {
        history.push('/Login')
    });
    // Assert
    expect(history.location.pathname).toBe("/Login");
});

it('10. Als geregistreerde gebruiker kan je jouw profiel aanpassen', async () => {
    // Arrange
    const history = createMemoryHistory({forceRefresh:true});
    const testContextData = {
        isAuth: true,
        user: {
            username: "test"
        }
    }
    render(
        <Router history={history}>
            <AuthContext.Provider value={testContextData}>
                <App />
            </AuthContext.Provider>
        </Router>
    )
    // Act
    act(() => {
        history.push('/Profile')
    });
    // Assert
    expect(history.location.pathname).toBe("/Profile");
});
