import React, {useContext, useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../../context/AuthContext";
import Button from "../../button/Button";
import './ContactForm.css'
import Label from "../../formComponents/Label";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import ContentContainer from "../../contentContainer/ContentContainer";
import InformationMessage from "../../informationMessage/InformationMessage";
import {useHistory} from "react-router-dom";

function ContactForm() {
    const controller = new AbortController();

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {user: {username, email}} = useContext(AuthContext);
    const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
    const [textfieldIcon, setTextfieldIcon] = useState('fa-solid fa-circle-info');
    const [emailIcon, setEmailIcon] = useState('fa-solid fa-circle-info');
    const [usernameIcon, setUsernameIcon] = useState('fa-solid fa-circle-info');
    const [showUsernameInformation, setShowUsernameInformation] = useState(false);
    const [showTextfieldInformation, setShowTextfieldInformation] = useState(false);
    const [showEmailInformation,setShowEmailInformation] = useState (false);

    const history = useHistory();

    useEffect(()=>{
        return history.listen((location) => {
            console.log(`You changed the page to: ${location.pathname}`)
        })

        return function cleanup(){
            controller.abort();
        }
    },[history]);

    async function sendContactForm(data) {
        console.log('Form is send');
        console.log(data.contactName);
        console.log(data.contactEmail);
        console.log(data.contactMessage);
        setIsRequestSuccessful(true);
    }

    function provideInfo(fieldname){
       switch(fieldname){
           case 'email':
               if(emailIcon === 'fa-solid fa-circle-info'){
                   setEmailIcon('fa-solid fa-circle-xmark')
                   setShowEmailInformation(true);
               }else{
                   setEmailIcon('fa-solid fa-circle-info')
                   setShowEmailInformation(false);
               }
               break
           case 'username':
               if(usernameIcon === 'fa-solid fa-circle-info'){
                   setUsernameIcon('fa-solid fa-circle-xmark')
                   setShowUsernameInformation(true);
               }else{
                   setUsernameIcon('fa-solid fa-circle-info')
                   setShowUsernameInformation(false);
               }
               break
           case 'messageField':
               if(textfieldIcon === 'fa-solid fa-circle-info'){
                   setTextfieldIcon('fa-solid fa-circle-xmark')
                   setShowTextfieldInformation(true);
               }else{
                   setTextfieldIcon('fa-solid fa-circle-info')
                   setShowTextfieldInformation(false);
               }
               break
           default:
               setShowUsernameInformation(false);
               setShowEmailInformation(false);
               setShowTextfieldInformation(false);
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
                    <Label htmlFor='contactName' labelText='Name:' />
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
                        <i className={usernameIcon} onClick={() => provideInfo('username')}></i>
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
                        <i className={emailIcon} onClick={() => provideInfo('email')}></i>
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
                    <Label htmlFor='contactMessage' labelText='Message:' />
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
                        <i className={textfieldIcon} onClick={() => provideInfo('messageField')}></i>
                       {showTextfieldInformation &&
                           <InformationMessage
                               message='Please typ out your joke in this field'
                           />
                       }
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