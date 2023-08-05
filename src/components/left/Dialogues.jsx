import React from 'react';

const component = ({dialogues, selectedDialogue, onSelectDialogue, onCreateDialogue }) => {
    if (!dialogues) {
        return <div className="dialogues"></div>
    }

    return (
        <div className="dialogues">
            <h2>Dialogues</h2>
            <div className="scrolling">
                {Object.keys(dialogues).map((name) => {
                    return (
                        <div onClick={() => {onSelectDialogue(name)}} className={`selectable ${selectedDialogue === name ? 'selected' : null}`}>
                            {name}
                        </div>
                    )
                })}
            </div>
            <div><button onClick={onCreateDialogue}>Add Dialogue</button></div>
        </div>
    )
}

export default component;