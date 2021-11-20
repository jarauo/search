import React from 'react';
import { observer } from 'mobx-react-lite';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { SynthesisBatch } from '../../../app/models/synthesisbatch';

const synthesisBatchImageStyle = {
    filter: 'brightness(30%)'
};

const synthesisBatchImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    synthesisBatch: SynthesisBatch
}

export default observer (function SynthesisBatchDetailedHeader({synthesisBatch}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/user.jpg`} fluid style={synthesisBatchImageStyle} />
                <Segment style={synthesisBatchImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header 
                                    size='huge'
                                    content={synthesisBatch.batchNumber}
                                    style={{color: 'white'}}
                                />
                                <p>{synthesisBatch.date}</p>
                                <p>Hosted by <strong>JU</strong></p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join SynthesisBatch</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})