import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer (function SynthesisBatchDetails() {

    const {synthesisBatchStore} = useStore();
    const {selectedSynthesisBatch: synthesisbatch, loadSynthesisBatch, loadingInitial} = synthesisBatchStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadSynthesisBatch(id);
    }, [id, loadSynthesisBatch]);

    if (loadingInitial || !synthesisbatch) return <LoadingComponent />;

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
                        <Button as={Link} to={`/manage/${synthesisbatch.id}`} basic color='blue' content='Edit' />
                        <Button as={Link} to='/synthesisBatches/' basic color='grey' content='Cancel' />
                    </Button.Group>
                </Card.Content>
        </Card>
    )
})