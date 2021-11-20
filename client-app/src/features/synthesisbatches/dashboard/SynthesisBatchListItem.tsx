import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { SynthesisBatch } from '../../../app/models/synthesisbatch';

interface Props {
    synthesisbatch: SynthesisBatch
}

export default function SynthesisBatchListItem({synthesisbatch}: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/synthesisBatches/${synthesisbatch.id}`}>
                                {synthesisbatch.batchNumber}
                            </Item.Header>
                            <Item.Description>Synthesis done by JU</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {synthesisbatch.date}
                    <Icon name='marker' /> {synthesisbatch.startTime}
                </span>
            </Segment>
            <Segment secondary>
                Attendees goes here
            </Segment>
            <Segment clearing>
                <span>{synthesisbatch.synthesisPerson}</span>
                <Button 
                    as={Link}
                    to={`/synthesisBatches/${synthesisbatch.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}