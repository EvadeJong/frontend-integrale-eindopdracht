import React,  {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";
import {useHistory} from "react-router-dom";
import './ContentContainer.css';


function ContentContainer({title, subtitle, content, subcontent}){
    const {isAuth, user: {username}} = useContext(AuthContext);
    let history = useHistory();

    return(
        <>
                <article className="contentContainer">
                    <h1 className="title">{title} {username}</h1>
                    {subtitle &&
                        <h2 className="subtitle">{subtitle}</h2>
                    }
                    <p className="content">
                        {content}
                    </p>
                    {subcontent &&
                        <h4 className="subcontent">{subcontent}</h4>
                    }
                    {!isAuth &&
                        <Button onClick={() => history.push('/login')} text={'Register'}/>
                    }
                </article>
        </>
    )
}

export default ContentContainer;