import React from 'react';

const component = ({dialogue, index, onDialogIndexChange}) => {
    if (!dialogue) {
        return <></>
    }

    return (
        <div className='dialogue-text'>
            <h2>Dialogue</h2>
            <table>
                <tbody>
                    { dialogue.dialogue.map((entry, dialogueIndex) => {
                        return (
                            <tr className={`${index === dialogueIndex ? 'selected' : null}`}>
                                <td>
                                    <button>Up</button><br />
                                    <button>Down</button>
                                </td>
                                <td><button onClick={() => {onDialogIndexChange(dialogueIndex)}}>Select</button></td>
                                <td><textarea className='editor-text' value={entry.text}></textarea></td>
                                <td><textarea className='editor-choice' value={entry.choices}></textarea></td>
                                <td><button>Add Below</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default component;