import React, { useState, useCallback } from "react";
import InformationMessage from '../informationMessage/InformationMessage';

export const FieldName = {
    JokeAbout: 'jokeAbout',
    JokeType: 'jokeType',
    JokeFlag: 'JokeFlag',
    JokeField: 'jokeField',
    PunchlineField: 'punchlineField',
    Email: 'email',
    Username: 'username',
    MessageField: 'messageField',
    NumberOfJokes: 'nrOfJokes'
};

function InformationProvider({fieldname}) {
    const infoIcon = 'fa-solid fa-circle-info';
    const xmarkIcon = 'fa-solid fa-circle-xmark';

    const [informationIcon, setInformationIcon] = useState(infoIcon);
    const [showInformationMessage, setShowInformationMessage] = useState(false);
    
    const toggleShowInformationMessage = useCallback(
        () => { 
            setShowInformationMessage(!showInformationMessage)
            if (informationIcon === infoIcon) {
                setInformationIcon(xmarkIcon);
            } else {
                setInformationIcon(infoIcon);
            }
        }
    );

    let informationMessage = '';
    switch (fieldname) {
        case FieldName.JokeAbout:
            informationMessage = 'What should the joke be about?';
            break;
        case FieldName.JokeType:
            informationMessage = 'Select the type of the joke';
            break;
        case FieldName.JokeFlag:
            informationMessage = 'What should it not be? (optional)';
             break;
        case FieldName.JokeField:
            informationMessage = 'Tell us your joke here';
            break;
        case FieldName.PunchlineField:
            informationMessage = 'Tell us your joke here';
            break;
        case FieldName.Email:
            informationMessage = 'Please provide us with your email'; 
            break;
        case FieldName.Username:
            informationMessage = 'Please provide us with your name'
            break; 
        case FieldName.MessageField:
            informationMessage = 'Please typ out your joke in this field'
            break;
        case FieldName.NumberOfJokes:
            informationMessage ='Select the number of the joke (1, 3 or 5)'
            break;
        default:
            informationMessage = 'Default message';
    }

    return (
        <>
            <i 
                className={informationIcon}
                onClick={() => toggleShowInformationMessage()}
            />
            {showInformationMessage && 
                <>
                    <InformationMessage message={informationMessage}/>
                </>
            }
        </>
    )
    
    
}

export default InformationProvider;