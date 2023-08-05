import React from 'react';

const component = ({dialogue, index}) => {
    if (!dialogue) {
        return <div className='characters'></div>
    }

    let {positions} = dialogue.dialogue[index];

    console.log("POSITION: " + JSON.stringify(positions, null, 5));

    return (
        <>
            <h2>Positions</h2>
            <div className='characters'>
                {Object.keys(positions).map(position => {
                    return (
                        <div>
                            <div>{position.toUpperCase()}</div>
                            <div><input type='text' value={positions[position]?.name || 'none' } /></div>
                            <div>override</div>
                            <div><input type='text' value={positions[position]?.override || 'none'} /></div>
                            <div>
                                <input type="checkbox" />Speaking
                            </div>
                            <div>{positions[position]?.override}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default component;