import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { SynthesisBatch } from '../../../app/models/synthesisbatch';


interface Props {
    synthesisbatch: SynthesisBatch;
    cancelSelectSynthesisBatch: () => void;
    openForm: (id: string) => void;

}

export default function SynthesisBatchDetails({synthesisbatch,cancelSelectSynthesisBatch, openForm}: Props) {
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
                        <Button onClick={cancelSelectSynthesisBatch} basic color='grey' content='Cancel' />
                    </Button.Group>
                </Card.Content>
        </Card>
    )
}