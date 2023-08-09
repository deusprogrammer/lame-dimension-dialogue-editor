import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';

const Component = () => {
    const navigate = useNavigate();
    const [scripts, setScripts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');

    const loadScripts = async () => {
        try {
            let res = await axios.get(`http://localhost:8080/scripts`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });

            setScripts(res.data);
        } catch (e) {
            console.error(e);
            navigate(`/login`);
        }
    }

    useEffect(() => {
        loadScripts();
    }, []);

    return <>
        {scripts.map(script => {
            return <div style={{cursor: 'pointer'}} onClick={() => {navigate(`/scripts/${script.id}`)}}>{script.id}[{script.editor}]</div>
        })}
    </>;
}

export default Component;