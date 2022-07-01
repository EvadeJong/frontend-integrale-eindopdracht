import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";
import './ContactForm.css'
import Label from "../formComponents/Label";
import ErrorMessage from "../errorMessage/ErrorMessage";

function ContactForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {isAuth, user: {username, email}} = useContext(AuthContext);
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

    useEffect(() => {
        if (isAuth) {
            setContactName(username);
            setContactEmail(email);
        }
    }, [isAuth])

    async function sendContactForm() {
        console.log('Form is send');
        console.log(`Name: ${contactName}`);
        console.log(`Email: ${contactEmail}`);
        console.log(`Message: ${contactMessage}`);
        setIsRequestSuccessful(true);
    }


    return (
        <>
            {isRequestSuccessful ?

                <h3>Your message is send successfully!</h3>
                :
                <form className='contactForm' onSubmit={handleSubmit(sendContactForm)}>
                    <h2>You are not a joke to us!</h2>
                    <h3>Please reach out if you need help or have any suggestions.</h3>
                    <Label htmlFor='contactname' labelText='Name:' />
                    <input
                        type='text'
                        id='contactname'
                        {...register('contactname',
                            {
                                required: 'You must specify a name',
                            })
                        }
                        onChange={(e) => setContactName(e.target.value)}
                    />
                    {errors.contactname &&
                        <ErrorMessage
                            className={'fieldErrorMessageLight'}
                            message={errors.contactname.message}
                        />
                    }

                    <Label htmlFor="contactemail" labelText='Email:'/>
                    <input
                        type="email"
                        id="contactemail"
                        {...register("contactemail",
                            {
                                required: "You must specify an email address",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Enter a valid e-mail address',
                                },
                            }
                        )}
                        onChange={(e) => setContactEmail(e.target.value)}
                    />
                    {errors.contactemail &&
                        <ErrorMessage
                            className={'fieldErrorMessageLight'}
                            message={errors.contactemail.message}
                        />
                    }
                    <Label className='contacttextfield' htmlFor='contacttextfield' labelText='Message:' />
                    <textarea className='contacttextfield'
                              id='contacttextfield'
                              {...register("contacttextfield",
                                  {
                                      required: "Message can not be empty",
                                  },
                              )}
                              onChange={(e) => setContactMessage(e.target.value)}>
                       </textarea>
                    {errors.contacttextfield &&
                        <ErrorMessage
                            className={'fieldErrorMessageLight'}
                            message={errors.contacttextfield.message}
                        />
                     }
                    <Button type='submit' text='Send message'/>
                </form>
            }
        </>
    )
}

export default ContactForm;