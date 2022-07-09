//React imports
import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';

//CSS imports
import './ContactForm.css'

//Context imports
import {AuthContext} from '../../../context/AuthContext';

//Component imports
import Button from '../../button/Button';
import Label from '../../formComponents/Label';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import ContentContainer from '../../contentContainer/ContentContainer';
import InformationProvider, { FieldName } from '../../informationProvider/InformationProvider';

function ContactForm() {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const {user: {username, email}} = useContext(AuthContext);
    const history = useHistory();

    //fieldsettings and icons
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        return function cleanup() {
            controller.abort();
        }
    }, [history.location.pathname]);

    async function sendContactForm(data) {
        console.log('Form is send');
        console.log(data.contactName);
        console.log(data.contactEmail);
        console.log(data.contactMessage);
        setIsRequestSuccessful(true);
    }

    function backToHome() {
        reset();
        setIsRequestSuccessful(!isRequestSuccessful);
        history.push('./');
    }

    return (
        <>
            {isRequestSuccessful ?
                <>
                    <ContentContainer
                        subtitle='Your message is send successfully!'/>
                    <Button type='button' text='Back to homepage' onClick={backToHome}/>
                </>
                :
                <>
                    <ContentContainer
                        subtitle='You are not a joke to us!'
                        content='Please reach out if you need help or have any suggestions.'
                    />
                    <form className='contactForm' onSubmit={handleSubmit(sendContactForm)}>
                        <Label htmlFor='contactName' labelText='Name:'/>
                        <div className='icon'>
                            <input
                                className='contactInput'
                                type='text'
                                id='contactName'
                                defaultValue={username}
                                {...register('contactName',
                                    {
                                        required: 'You must specify a name',
                                    })
                                }
                            />
                            <InformationProvider fieldname={FieldName.Username}/>
                        </div>
                        {errors.contactname &&
                            <ErrorMessage
                                className={'fieldErrorMessageLight'}
                                message={errors.contactname.message}
                            />
                        }

                        <Label htmlFor="contactEmail" labelText='Email:'/>
                        <div className='icon'>
                            <input
                                className='contactInput'
                                type="email"
                                id="contactEmail"
                                defaultValue={email}
                                {...register("contactEmail",
                                    {
                                        required: "You must specify an email address",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Enter a valid e-mail address',
                                        },
                                    }
                                )}
                            />
                            <InformationProvider fieldname={FieldName.Email}/>
                        </div>
                        {errors.contactemail &&
                            <ErrorMessage
                                className={'fieldErrorMessageLight'}
                                message={errors.contactemail.message}
                            />
                        }
                        <Label htmlFor='contactMessage' labelText='Message:'/>
                        <div className='icon'>
                        <textarea className='contactMessage'
                              id='contactMessage'
                              spellCheck="true"
                              lang="en"
                              {...register("contactMessage",
                                  {
                                      required: "Message can not be empty",
                                      minLength: {
                                          value: 5,
                                          message: "Your message must have at least 5 characters"
                                      }
                                  },
                              )}
                        >
                        </textarea>
                        <InformationProvider fieldname={FieldName.MessageField} fieldMessage='Please typ out your message in this field'/>
                        </div>
                        {errors.contactMessage &&
                            <ErrorMessage
                                className={'fieldErrorMessageLight'}
                                message={errors.contactMessage.message}
                            />
                        }
                        <Button type='submit' text='Send message'/>
                    </form>
                </>
            }
        </>
    )
}

export default ContactForm;