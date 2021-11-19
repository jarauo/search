import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function SynthesisBatchForm() {
    const history = useHistory();
    const {synthesisBatchStore} = useStore();
    const {createSynthesisBatch, updateSynthesisBatch, loading, loadSynthesisBatch, loadingInitial} = synthesisBatchStore;
    const {id} = useParams<{id: string}>();

    const [synthesisBatch, setSynthesisBatch] = useState({
        id: '',
        batchNumber: '',
        date: '',
        startTime: '',
        endTime: '',
        targetryPerson: '',
        synthesisPerson: '',
        qcPerson: '',
        releaser: '',
        cyclotron: '',
    });

    useEffect(() => {
        if (id) loadSynthesisBatch(id).then(synthesisbatch => setSynthesisBatch(synthesisbatch!))
    }, [id, loadSynthesisBatch]);

    function handleSubmit() {
        if (synthesisBatch.id.length === 0) {
            let newSynthesisBatch = {
                ...synthesisBatch,
                id: uuid()
            };
            createSynthesisBatch(newSynthesisBatch).then(() => history.push(`/synthesisBatches/${newSynthesisBatch.id}`))
        } else {
            updateSynthesisBatch(synthesisBatch).then(() => history.push(`/synthesisBatches/${synthesisBatch.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setSynthesisBatch({...synthesisBatch, [name]: value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading synthesis batch...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='SynthesisBatchNumber' value={synthesisBatch.batchNumber} name='batchNumber' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={synthesisBatch.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='StartTime' value={synthesisBatch.startTime} name='startTime' onChange={handleInputChange}/>
                <Form.Input placeholder='EndTime' value={synthesisBatch.endTime} name='endTime' onChange={handleInputChange}/>
                <Form.Input placeholder='TargetryPerson' value={synthesisBatch.targetryPerson} name='targetryPerson' onChange={handleInputChange}/>
                <Form.Input placeholder='SynthesisPerson' value={synthesisBatch.synthesisPerson} name='synthesisPerson' onChange={handleInputChange}/>
                <Form.Input placeholder='QcPerson' value={synthesisBatch.qcPerson} name='qcPerson' onChange={handleInputChange}/>
                <Form.Input placeholder='Releaser' value={synthesisBatch.releaser} name='releaser' onChange={handleInputChange}/>
                <Form.Input placeholder='Cyclotron' value={synthesisBatch.cyclotron} name='cyclotron' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/synthesisBatches' floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})