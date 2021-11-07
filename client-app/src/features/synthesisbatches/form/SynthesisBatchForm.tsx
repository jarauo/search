import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { SynthesisBatch } from '../../../app/models/synthesisbatch';

interface Props {
    synthesisbatch: SynthesisBatch | undefined;
    closeForm: () => void;
    createOrEdit: (synthesisbatch: SynthesisBatch) => void;
}

export default function SynthesisBatchForm({synthesisbatch: selectedSynthesisBatch, closeForm, createOrEdit}: Props) {

    const initialState = selectedSynthesisBatch ?? {
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
    }

    const [synthesisBatch, setSynthesisBatch] = useState(initialState);

    function handleSubmit() {
        createOrEdit(synthesisBatch);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setSynthesisBatch({...synthesisBatch, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='SynthesisBatchNumber' value={synthesisBatch.batchNumber} name='batchNumber' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={synthesisBatch.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='StartTime' value={synthesisBatch.startTime} name='startTime' onChange={handleInputChange}/>
                <Form.Input placeholder='EndTime' value={synthesisBatch.endTime} name='endTime' onChange={handleInputChange}/>
                <Form.Input placeholder='TargetryPerson' value={synthesisBatch.targetryPerson} name='targetryPerson' onChange={handleInputChange}/>
                <Form.Input placeholder='SynthesisPerson' value={synthesisBatch.synthesisPerson} name='synthesisPerson' onChange={handleInputChange}/>
                <Form.Input placeholder='QcPerson' value={synthesisBatch.qcPerson} name='qcPerson' onChange={handleInputChange}/>
                <Form.Input placeholder='Releaser' value={synthesisBatch.releaser} name='releaser' onChange={handleInputChange}/>
                <Form.Input placeholder='Cyclotron' value={synthesisBatch.cyclotron} name='cyclotron' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}