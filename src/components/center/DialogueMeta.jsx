import React from 'react';

const component = ({dialogueKey, dialogue}) => {
    if (!dialogueKey) {
        return <></>
    }

    return (
        <div className='dialogue-meta'>
            <input type='text' value={dialogueKey} />
        </div>
    )
}

export default component;