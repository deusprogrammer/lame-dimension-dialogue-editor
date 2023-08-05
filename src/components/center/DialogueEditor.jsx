import React, { useEffect } from 'react';

const Component = ({dialogue, index, onDialogueIndexChange, onDialogueChange, onDialogueAdd, onDialogueRearrange}) => {
    useEffect(() => {
        console.log("DIALOG UPDATED");
    }, [dialogue]);
    
    if (!dialogue) {
        return <></>
    }

    const updateDialogue = (field, index, value) => {
        let entry = {...dialogue.dialogue[index]};
        entry[field] = value;
        onDialogueChange(index, entry);
    }

    const swapDialogues = (index, otherIndex) => {
        let copy = [...dialogue.dialogue];
        let temp = {...copy[index]};
        copy[index] = copy[otherIndex];
        copy[otherIndex] = temp;
        onDialogueRearrange(copy);
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
                                    {dialogueIndex > 0 ? <><button tabIndex={dialogueIndex + dialogCount} onClick={() => {swapDialogues(index, index - 1)}}>Up</button><br /></> : null}
                                    {dialogueIndex < dialogue.dialogue.length - 1 ? <button tabIndex={dialogueIndex + 1 + dialogCount} onClick={() => {swapDialogues(index, index + 1)}}>Down</button>: null}
                                </td>
                                <td><textarea tabIndex={dialogueIndex + 1 + dialogCount * 2} className='editor-text' onFocus={() => {onDialogueIndexChange(dialogueIndex)}} onChange={({target: {value}}) => {updateDialogue('text', dialogueIndex, value)}} value={entry.text}></textarea></td>
                                <td><textarea tabIndex={dialogueIndex + 1 + dialogCount * 3} className='editor-choice' onFocus={() => {onDialogueIndexChange(dialogueIndex)}} onChange={({target: {value}}) => {updateDialogue('choices', dialogueIndex, value.split('\n'))}} value={entry.choices?.join('\n')}></textarea></td>
                                <td><button tabIndex={dialogueIndex + 1 + dialogCount * 4} onClick={() => {onDialogueAdd(index)}}>Add Below</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Component;