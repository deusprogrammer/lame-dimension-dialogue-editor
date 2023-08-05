import React from 'react';

const languages = ["EN", "ES", "JP", "FR", "BR", "CH"];

const component = ({onSelectLanguage, selectedLanguage}) => {
    return (
        <div className="languages">
            <h2>Languages</h2>
            <div className="language-grid">
                {languages.map(language => {
                    return <div onClick={() => {onSelectLanguage(language)}} className={`selectable ${selectedLanguage === language ? "selected" : null}`}>{language}</div>
                })}
            </div>
        </div>
    )
}

export default component;