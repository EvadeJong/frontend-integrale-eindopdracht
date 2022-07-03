import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../../context/AuthContext";
import Button from "../../button/Button";
import './ContactForm.css'
import Label from "../../formComponents/Label";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import ContentContainer from "../../contentContainer/ContentContainer";
import InformationMessage from "../../informationMessage/InformationMessage";

function ContactForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {isAuth, user: {username, email}} = useContext(AuthContext);
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [textfieldIcon, setTextfieldIcon] = useState('fa-solid fa-circle-info');
    const [emailIcon, setEmailIcon] = useState('fa-solid fa-circle-info');
    const [usernameIcon, setUsernameIcon] = useState('fa-solid fa-circle-info');
    const [showUsernameInformation, setShowUsernameInformation] = useState(false);
    const [showTexfieldInformation, setShowTexfieldInformation] = useState(false);
    const [showEmailInformation,setShowEmailInformation] = useState (false);

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
    function provideTextfieldInfo(){
        if(textfieldIcon === 'fa-solid fa-circle-info'){
            setTextfieldIcon('fa-solid fa-circle-xmark')
            setShowTexfieldInformation(true);
        }else{
            setTextfieldIcon('fa-solid fa-circle-info')
            setShowTexfieldInformation(false);
        }
    }
    function provideUserNameInfo(){
        if(usernameIcon === 'fa-solid fa-circle-info'){
            setUsernameIcon('fa-solid fa-circle-xmark')
            setShowUsernameInformation(true);
        }else{
            setUsernameIcon('fa-solid fa-circle-info')
            setShowUsernameInformation(false);
        }
    }

    function provideEmailInfo(){
        if(emailIcon === 'fa-solid fa-circle-info'){
            setEmailIcon('fa-solid fa-circle-xmark')
            setShowEmailInformation(true);
        }else{
            setEmailIcon('fa-solid fa-circle-info')
            setShowEmailInformation(false);
        }
    }

    return (
        <>
            {isRequestSuccessful ?
                <h3>Your message is send successfully!</h3>
                :
                <>
                <ContentContainer
                    subtitle='You are not a joke to us!'
                    content= 'Please reach out if you need help or have any suggestions.'
                />

                <form className='contactForm' onSubmit={handleSubmit(sendContactForm)}>
                    <Label htmlFor='contactname' labelText='Name:' />
                    <div className='icon'>
                    <input
                        className='contactInput'
                        type='text'
                        id='contactname'
                        {...register('contactname',
                            {
                                required: 'You must specify a name',
                            })
                        }
                        onChange={(e) => setContactName(e.target.value)}
                    />
                        <i className={usernameIcon} onClick={() => provideUserNameInfo()}></i>
                        {showUsernameInformation &&
                            <InformationMessage
                                message='Please provide us with your name'
                            />
                        }
                    </div>
                    {errors.contactname &&
                        <ErrorMessage
                            className={'fieldErrorMessageLight'}
                            message={errors.contactname.message}
                        />
                    }

                    <Label htmlFor="contactemail" labelText='Email:'/>
                    <div className='icon'>
                    <input
                        className='contactInput'
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
                        <i className={emailIcon} onClick={() => provideEmailInfo()}></i>
                        {showEmailInformation &&
                            <InformationMessage
                                message='Please provide us with your email'
                            />
                        }
                      </div>
                    {errors.contactemail &&
                        <ErrorMessage
                            className={'fieldErrorMessageLight'}
                            message={errors.contactemail.message}
                        />
                    }
                    <Label className='contacttextfield' htmlFor='contacttextfield' labelText='Message:' />
                   <div className='icon'>
                    <textarea className='contacttextfield'
                              id='contacttextfield'
                              {...register("contacttextfield",
                                  {
                                      required: "Message can not be empty",
                                      minLength: {
                                          value: 5,
                                          message: "Your message must have at least 5 characters"
                                      }
                                  },
                              )}
                              onChange={(e) => setContactMessage(e.target.value)}>

                       </textarea>
                        <i className={textfieldIcon} onClick={() => provideTextfieldInfo()}></i>
                       {showTexfieldInformation &&
                           <InformationMessage
                               message='Please typ out your joke in this field'
                           />
                       }
                   </div>

                    {errors.contacttextfield &&
                        <ErrorMessage
                            className={'fieldErrorMessageLight'}
                            message={errors.contacttextfield.message}
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