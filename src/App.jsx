import { useState } from 'react';
import './App.css';

import Chapters from './components/left/Chapters';
import Languages from './components/left/Languages';
import Dialogues from './components/left/Dialogues';

import TextBox from './components/center/TextBox';
import Characters from './components/center/Characters';
import DialogueMeta from './components/center/DialogueMeta';
import DialogueEditor from './components/center/DialogueEditor';

import Option from './components/right/Options';

import testChapters from './data/chapters';

function App() {
    const [language, setLanguage] = useState("EN");
    const [chapters, setChapters] = useState(testChapters);
    const [chapter, setChapter] = useState("");
    const [dialogue, setDialogue] = useState("");
    const [dialogueIndex, setDialogueIndex] = useState(0);

    const updateDialog = (index, entry) => {
        let copy = {...chapters};
        copy[chapter].dialogues[dialogue].dialogue[index] = entry;
        setChapters(copy);
    }

    const addDialog = (afterIndex) => {
        let copy = {...chapters};
        copy[chapter].dialogues[dialogue].dialogue.splice(afterIndex + 1, 0, {
            positions: {
                left: {},
                leftFront: {},
                rightFront: {},
                right: {}
            },
            text: "",
            active: "left",
            emote: null
        });
        setDialogueIndex(afterIndex + 1);
        setChapters(copy);
    }

    const storeDialogues = (newDialogs) => {
        let copy = {...chapters};
        copy[chapter].dialogues[dialogue].dialogue = newDialogs;
        setChapters(copy);
    }

    return (
        <div className="container">
            <div className="left">
                <Chapters 
                    onChapterSelect={setChapter} 
                    selectedChapter={chapter}
                    chapters={chapters} />
                <Dialogues dialogues={chapters[chapter]?.dialogues} selectedDialogue={dialogue} onSelectDialogue={setDialogue} />
                <Languages selectedLanguage={language} onSelectLanguage={setLanguage} />
            </div>
            <div className="center" style={{textAlign: 'center'}}>
                <h1>Dialog Editor</h1>
                <DialogueMeta dialogueKey={dialogue} dialogue={chapters[chapter]?.dialogues[dialogue]} />
                <TextBox dialogue={chapters[chapter]?.dialogues[dialogue]} index={dialogueIndex} />
                <Characters dialogue={chapters[chapter]?.dialogues[dialogue]} index={dialogueIndex} onCharacterChange={updateDialog} />
                <DialogueEditor dialogue={chapters[chapter]?.dialogues[dialogue]} index={dialogueIndex} onDialogueIndexChange={setDialogueIndex} onDialogueChange={updateDialog} onDialogueAdd={addDialog} onDialogueRearrange={storeDialogues} />
            </div>
            <div className="right">
                <Option onChange={() => {}} />
            </div>
        </div>
    );
}

export default App;