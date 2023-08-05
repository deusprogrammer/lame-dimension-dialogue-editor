import React from 'react';

const component = ({dialogueKey, dialogue}) => {
    return (
        <div className='dialogue-meta'>
            <input type='text' value={dialogueKey} />
        </div>
    )
}

export default component;