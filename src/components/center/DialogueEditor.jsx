import React, { useEffect } from 'react';

const Component = ({dialogue, index, onDialogIndexChange, onDialogChange}) => {
    useEffect(() => {
        console.log("DIALOG UPDATED");
    }, [dialogue]);
    
    if (!dialogue) {
        return <></>
    }

    const updateDialog = (field, index, value) => {
        let entry = {...dialogue.dialogue[index]};
        entry[field] = value;
        onDialogChange(index, entry);
    }

    const dialogCount = dialogue.dialogue.length;

    return (
        <div className='dialogue-text'>
            <h2>Dialogue</h2>
            <table>
                <tbody>
                    { dialogue.dialogue.map((entry, dialogueIndex) => {
                        return (
                            <tr className={`${index === dialogueIndex ? 'selected' : null}`}>
                                <td>
                                    <button tabIndex={dialogueIndex + dialogCount}>Up</button><br />
                                    <button tabIndex={dialogueIndex + 1 + dialogCount}>Down</button>
                                </td>
                                <td><textarea tabIndex={dialogueIndex + 1 + dialogCount * 2} className='editor-text' onFocus={() => {onDialogIndexChange(dialogueIndex)}} onChange={({target: {value}}) => {updateDialog('text', dialogueIndex, value)}} value={entry.text}></textarea></td>
                                <td><textarea tabIndex={dialogueIndex + 1 + dialogCount * 3} className='editor-choice' onFocus={() => {onDialogIndexChange(dialogueIndex)}} onChange={({target: {value}}) => {updateDialog('choices', dialogueIndex, value.split('\n'))}} value={entry.choices?.join('\n')}></textarea></td>
                                <td><button tabIndex={dialogueIndex + 1 + dialogCount * 4}>Add Below</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Component;