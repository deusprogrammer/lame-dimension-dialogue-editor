import React from 'react';

import CharacterSprite from './CharacterSprite';

const Component = ({dialogue, index}) => {
    if (!dialogue) {
        return <></>
    }

    let {active} = dialogue.dialogue[index];

    return (
        <div style={{backgroundColor: "teal", margin: "auto", position: "relative", width: "640px", height: "410px"}}>
            <CharacterSprite position='left' dialogue={dialogue.dialogue[index]} active={active} />
            <CharacterSprite position='leftfront' dialogue={dialogue.dialogue[index]} active={active}/>
            <CharacterSprite position='rightfront' dialogue={dialogue.dialogue[index]} active={active}/>
            <CharacterSprite position='right' dialogue={dialogue.dialogue[index]} active={active}/>
        </div>
    )
}

export default Component