import React from 'react';

import { Stage, Container, Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js'

import characters from '../../data/characters';

const component = ({dialogue, index}) => {
    if (!dialogue) {
        return <></>
    }

    let {active, text} = dialogue.dialogue[index];

    let speakerStyle = new PIXI.TextStyle({
        align: 'left',
        fontSize: '15pt',
        fontWeight: 'bolder',
        fill: '#F1AA1C',
    });

    let textStyle = new PIXI.TextStyle({
        align: 'left',
        fontSize: '14pt',
        fontWeight: 'lighter',
        fill: '#FFFFFF',
        letterSpacing: 2,
    });

    let speaker = dialogue.dialogue[index].positions[active].override || characters[dialogue.dialogue[index].positions[active].name]?.name;

    return (
        <div>
            <h2>Preview</h2>
            <Stage width={640} height={70}>
                <Sprite texture={PIXI.Texture.WHITE} tint={'#0C0D0D'} width={640} height={70} />
                <Container x={0} y={0} width={640} height={70}>
                    <Text style={speakerStyle} x={10} y={5} text={speaker} anchor={{ x: 0, y: 0 }}/>
                    <Text style={textStyle} x={10} y={25} text={text}  anchor={{ x: 0, y: 0 }}/>
                </Container>
            </Stage>
            <br />
        </div>
    )
}

export default component;