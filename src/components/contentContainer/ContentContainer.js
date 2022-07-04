import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import './ContentContainer.css';


function ContentContainer({title, subtitle, content, subcontent}) {
    const {isAuth, user: {username}} = useContext(AuthContext);

    return (
        <>
            <article className="contentContainer">
                {title && isAuth &&
                    <h1 className="title">{title} {username}</h1>
                }
                {title && !isAuth &&
                    <h1 className="title">{title}</h1>
                }
                {subtitle &&
                    <h2 className="subtitle">{subtitle}</h2>
                }
                {content &&
                    <p className="content">
                        {content}
                    </p>
                }
                {subcontent &&
                    <h4 className="subcontent">{subcontent}</h4>
                }
            </article>
        </>
    )
}

export default ContentContainer;