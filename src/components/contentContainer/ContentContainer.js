//React imports
import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

//CSS imports
import './ContentContainer.css';


function ContentContainer({title, secondtitle, subtitle, content, subcontent}) {
    const {isAuth, user: {username}} = useContext(AuthContext);

    return (
        <>
            <article className='contentContainer'>
                {title && isAuth &&
                    <h1 className='title'>{title} {username}</h1>
                }
                {title && !isAuth &&
                    <h1 className='title'>{title}</h1>
                }
                { secondtitle &&
                    <h1 className='secondtitle'>{secondtitle}</h1>
                }
                {subtitle &&
                    <h2 className='subtitle'>{subtitle}</h2>
                }
                {content &&
                    <p className='content'>
                        {content}
                    </p>
                }
                {subcontent &&
                    <em className='subcontent'>{subcontent}</em>
                }
            </article>
        </>
    )
}

export default ContentContainer;