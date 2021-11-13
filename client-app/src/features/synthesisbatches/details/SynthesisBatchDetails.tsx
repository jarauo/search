import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function SynthesisBatchDetails() {

    const {synthesisBatchStore} = useStore();
    const {selectedSynthesisBatch: synthesisbatch, openForm, cancelSelectedSynthesisBatch} = synthesisBatchStore;

    if (!synthesisbatch) return <LoadingComponent />;

    return(
        <Card fluid>
            <Image src={'/assets/radioactive.jpg'}/>
            <Card.Content>
                <Card.Header>{synthesisbatch.batchNumber}</Card.Header>
                <Card.Meta>
                    <span>{synthesisbatch.date}</span>
                </Card.Meta>
                <Card.Description>
                    Synteesi
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button onClick={() => openForm(synthesisbatch.id)} basic color='blue' content='Edit' />
                        <Button onClick={cancelSelectedSynthesisBatch} basic color='grey' content='Cancel' />
                    </Button.Group>
                </Card.Content>
        </Card>
    )
}