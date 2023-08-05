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

import chapters from './data/chapters';

function App() {
    const [language, setLanguage] = useState("EN");
    const [chapter, setChapter] = useState("");
    const [dialogue, setDialogue] = useState("");
    const [dialogueIndex, setDialogueIndex] = useState(0);

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
                <Characters dialogue={chapters[chapter]?.dialogues[dialogue]} index={dialogueIndex} />
                <DialogueEditor dialogue={chapters[chapter]?.dialogues[dialogue]} index={dialogueIndex} onDialogIndexChange={setDialogueIndex} />
            </div>
            <div className="right">
                <Option onChange={() => {}} />
            </div>
        </div>
    );
}

export default App;
