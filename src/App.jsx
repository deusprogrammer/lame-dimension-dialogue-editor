import { useState } from 'react';
import './App.css';

import Chapters from './components/left/Chapters';
import Languages from './components/left/Languages';
import Scenes from './components/left/Scenes';

import CharacterSprites from './components/center/CharacterSprites';
import TextBox from './components/center/TextBox';
import Characters from './components/center/Characters';
import SceneMeta from './components/center/SceneMeta';
import DialogueEditor from './components/center/DialogueEditor';

import Option from './components/right/Options';

import testChapters from './data/chapters';

let dialogCounter = 0;

function App() {
    const [language, setLanguage] = useState('en');
    const [defaultLanguage, setDefaultLanguage] = useState('en');
    const [chapters, setChapters] = useState(testChapters);
    const [chapter, setChapter] = useState('');
    const [scene, setScene] = useState('');
    const [sceneIndex, setSceneIndex] = useState(0);

    const updateDialog = (index, entry) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue[index] = entry;
        setChapters(copy);
    };

    const addDialog = (afterIndex) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue.splice(afterIndex + 1, 0, {
            positions: {
                left: {},
                leftFront: {},
                rightFront: {},
                right: {},
            },
            text: '',
            active: 'left',
            emote: null,
        });
        setSceneIndex(afterIndex + 1);
        setChapters(copy);
    };

    const addChapter = () => {
        let chapterName = `Chapter ${chapters.length}`;
        if (chapters.length === 0) {
            chapterName = 'Prologue';
        }
        let copy = { ...chapters };
        copy[chapterName.toLocaleLowerCase()] = {
            name: chapterName,
            scenes: [],
        };
        setChapters(copy);
    };

    const storeDialogues = (newDialogs) => {
        let copy = { ...chapters };
        copy[chapter].scenes[scene].dialogue = newDialogs;
        setChapters(copy);
    };

    const createScene = () => {
        let newSceneKey = `scene${dialogCounter++}`;
        let copy = { ...chapters };
        copy[chapter].scenes[newSceneKey] = {
            dialogue: [
                {
                    positions: {
                        left: {},
                        leftFront: {},
                        rightFront: {},
                        right: {},
                    },
                    text: '',
                    active: 'left',
                    emote: null,
                },
            ],
        };
        setSceneIndex(0);
        setScene(newSceneKey);
        setChapters(copy);
    };

    return (
        <div className="container">
            <div className="left">
                <Chapters
                    onChapterSelect={setChapter}
                    onCreateChapter={addChapter}
                    selectedChapter={chapter}
                    chapters={chapters}
                />
                <Scenes
                    scenes={chapters[chapter]?.scenes}
                    selectedScene={scene}
                    onSelectScene={setScene}
                    onCreateScene={createScene}
                />
                <Languages
                    selectedLanguage={language}
                    onSelectLanguage={setLanguage}
                    defaultLanguage={defaultLanguage}
                    onSelectDefaultLanguage={setDefaultLanguage}
                />
            </div>
            <div className="center" style={{ textAlign: 'center' }}>
                <SceneMeta
                    sceneKey={scene}
                    scene={chapters[chapter]?.scenes[scene]}
                />
                <div className="preview">
                    <Characters side="left" 
                        scene={chapters[chapter]?.scenes[scene]}
                        index={sceneIndex}
                        onPositionChange={updateDialog} />
                        <div>
                            <CharacterSprites
                                scene={chapters[chapter]?.scenes[scene]}
                                index={sceneIndex}
                            />
                            <TextBox
                                language={language}
                                defaultLanguage={defaultLanguage}
                                scene={chapters[chapter]?.scenes[scene]}
                                index={sceneIndex}
                            />
                        </div>
                    <Characters side="right" 
                        scene={chapters[chapter]?.scenes[scene]}
                        index={sceneIndex}
                        onPositionChange={updateDialog} />
                </div>
                <Option onChange={() => {}} />
                <DialogueEditor
                    language={language}
                    defaultLanguage={defaultLanguage}
                    scene={chapters[chapter]?.scenes[scene]}
                    index={sceneIndex}
                    onDialogueIndexChange={setSceneIndex}
                    onDialogueChange={updateDialog}
                    onDialogueAdd={addDialog}
                    onDialogueRearrange={storeDialogues}
                />
            </div>
            <div className="right">
            </div>
        </div>
    );
}

export default App;
