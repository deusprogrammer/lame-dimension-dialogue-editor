import React from 'react';

import characters from '../../data/characters';

const component = ({dialogue, index, onCharacterChange: onPositionChange}) => {
    if (!dialogue) {
        return <div className='characters'></div>
    }

    let {positions, active} = dialogue.dialogue[index];

    const updatePositionName = (position, characterKey) => {
        let dialogueCopy = {...dialogue.dialogue[index]};
        let copy = {...dialogueCopy.positions};
        copy[position].name = characterKey;
        dialogueCopy.positions = copy;
        onPositionChange(index, dialogueCopy);
    }

    const updatePositionOverride = (position, override) => {
        let dialogueCopy = {...dialogue.dialogue[index]};
        let copy = {...dialogueCopy.positions};
        copy[position].override = override;
        dialogueCopy.positions = copy;
        onPositionChange(index, dialogueCopy);
    }

    const updateActivePosition = (position) => {
        let dialogueCopy = {...dialogue.dialogue[index]};
        dialogueCopy.active = position;
        onPositionChange(index, dialogueCopy);
    }

    return (
        <>
            <h2>Positions</h2>
            <div className='characters'>
                {Object.keys(positions).map(position => {
                    return (
                        <div>
                            <div>{position.toUpperCase()}</div>
                            <div>
                                <select onChange={({target: {value}}) => updatePositionName(position, value)} value={positions[position]?.name || 'none' }>
                                    <option value='none'>none</option>
                                    {Object.keys(characters).map(key => {
                                        return <option value={key}>{characters[key].name}</option>
                                    })}
                                </select>
                            </div>
                            <div>override</div>
                            <div><input type='text' onChange={({target: {value}}) => {updatePositionOverride(position, value)}} value={positions[position]?.override || 'none'} /></div>
                            <div>
                                <input type="checkbox" checked={active === position} onChange={({target: {checked}}) => { if (checked && positions[position]?.name) updateActivePosition(position)}} disabled={!positions[position]?.name} />Speaking
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default component;