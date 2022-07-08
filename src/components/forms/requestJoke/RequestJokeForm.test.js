import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import * as axios from "axios";

import RequestJokeForm from "./RequestJokeForm";
import AuthContextProvider from "../../../context/AuthContext";

jest.mock("axios");

afterEach(() => {
    cleanup();
})

it('3. De webapp geeft enkel Engelstalige grappen terug', async () => {
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
    axios.get.mockImplementationOnce(() => Promise.resolve(axiosResponse));
    render(
        <MemoryRouter>
            <AuthContextProvider>
                <RequestJokeForm/>
            </AuthContextProvider>
        </MemoryRouter>
    );
    userEvent.selectOptions(
        screen.getByTestId("jokeAboutSelector"),
        screen.getByRole('option', {name: "Any"})
    );
    userEvent.selectOptions(
        screen.getByTestId("jokeTypeSelector"),
        screen.getByRole('option', {name: "Single part"})
    );
    userEvent.selectOptions(
        screen.getByTestId("jokeNumberSelector"),
        screen.getByRole('option', {name: "One good laugh!"})
    );
    // Act
    await act( async () => {
        userEvent.click(
            screen.getByText("Request Joke")
        );
    });
    // Assert
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("lang=en"));
});

it(
    '12. Als geregistreerde gebruiker kan je een categorie voor de op te vragen grappen kiezen',
    async() => {
        render(
            <MemoryRouter>
                <AuthContextProvider>
                    <RequestJokeForm/>
                </AuthContextProvider>
            </MemoryRouter>
        );
        expect(screen.getByTestId('jokeAboutSelector').children.length).toBe(8);
    }
)

it(
    '13. Als geregistreerde gebruiker kan je bepaalde categorieën uitsluiten als het gaat om op te vragen grappen (racistisch, seksistisch, religieus, politiek, niet geschikt voor werkomgeving, seksueel)',
    async() => {
        render(
            <MemoryRouter>
                <AuthContextProvider>
                    <RequestJokeForm/>
                </AuthContextProvider>
            </MemoryRouter>
        );
        expect(screen.getByTestId('jokeFlagSelector').children.length).toBe(7);
    } 
);