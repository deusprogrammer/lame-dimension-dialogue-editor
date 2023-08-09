import { useEffect, useState } from 'react';

import Chapters from '../components/left/Chapters';
import Languages from '../components/left/Languages';
import Scenes from '../components/left/Scenes';

import CharacterSprites from '../components/center/CharacterSprites';
import TextBox from '../components/center/TextBox';
import Characters from '../components/center/Characters';
import SceneMeta from '../components/center/SceneMeta';
import DialogueEditor from '../components/center/DialogueEditor';

import Option from '../components/right/Options';
import characters from '../data/characters';

import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

let dialogCounter = 0;

function App() {
    const [language, setLanguage] = useState('en');
    const [defaultLanguage, setDefaultLanguage] = useState('en');
    const [chapters, setChapters] = useState({});
    const [chapter, setChapter] = useState('');
    const [scene, setScene] = useState('');
    const [sceneIndex, setSceneIndex] = useState(0);
    const navigate = useNavigate();
    const {id} = useParams();
    const jwtToken = localStorage.getItem('jwtToken');

    const loadScript = async () => {
        try {
            let res = await axios.get(`http://localhost:8080/scripts/${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });

            setChapters(res.data.chapters);
        } catch (e) {
            console.error(e);
            navigate(`/login`);
        }
    }

    useEffect(() => {
        loadScript();
    }, []);

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
                <button onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify({
                        characters,
                        chapters
                    }, null, 5));
                }}>
                    Take a Dump
                </button>
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
                {scene ? <Option onChange={() => {}} /> : null}
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
