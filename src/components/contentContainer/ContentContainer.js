import React,  {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import './ContentContainer.css';


function ContentContainer({title, subtitle, content, subcontent}){
    const {user: {username}} = useContext(AuthContext);


    return(
        <>
                <article className="contentContainer">
                    {title &&
                        <h1 className="title">{title} {username}</h1>
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