import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { synthesisPersonOptions } from '../../../app/common/options/synthesisPersonOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { SynthesisBatch } from '../../../app/models/synthesisbatch';

export default observer(function SynthesisBatchForm() {
    const history = useHistory();
    const {synthesisBatchStore} = useStore();
    const {createSynthesisBatch, updateSynthesisBatch, loading, loadSynthesisBatch, loadingInitial} = synthesisBatchStore;
    const {id} = useParams<{id: string}>();

    const [synthesisBatch, setSynthesisBatch] = useState<SynthesisBatch>({
        id: '',
        batchNumber: '',
        date: null,
        startTime: '',
        endTime: '',
        targetryPerson: '',
        synthesisPerson: '',
        qcPerson: '',
        releaser: '',
        cyclotron: '',
    });

    const validationSchema = Yup.object({
        batchNumber: Yup.string().required('The batch number is required'),
        date: Yup.string().required('The date is required').nullable(),
        startTime: Yup.string().required('Start time is required'),
        endTime: Yup.string().required('End time is required'),
        targetryPerson: Yup.string().required('Targetry person is required'),
        synthesisPerson: Yup.string().required('Synthesis person is required'),
        qcPerson: Yup.string().required('Qc person is required'),
        releaser: Yup.string().required('Releaser person is required'),
        cyclotron: Yup.string().required('Cyclotron is required'),
    })

    useEffect(() => {
        if (id) loadSynthesisBatch(id).then(synthesisbatch => setSynthesisBatch(synthesisbatch!))
    }, [id, loadSynthesisBatch]);

    
    function handleFormSubmit(synthesisBatch: SynthesisBatch) {
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

    if (loadingInitial) return <LoadingComponent content='Loading synthesis batch...' />

    return (
        <Segment clearing>
            <Header content='SynthesisBatch Details' sub color='teal'/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={synthesisBatch} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='batchNumber' placeholder='SynthesisBatchCode' />
                        <MyDateInput 
                            placeholderText='Date' 
                            name='date'
                            //showTimeSelect
                            //timeCaption='time'
                            dateFormat='dd.MM.yyyy'
                        />
                        <MyTextInput placeholder='StartTime' name='startTime' />
                        <MyTextInput placeholder='EndTime' name='endTime' />
                        <MySelectInput options={synthesisPersonOptions} placeholder='TargetryPerson' name='targetryPerson' />
                        <MySelectInput options={synthesisPersonOptions} placeholder='SynthesisPerson' name='synthesisPerson' />
                        <MyTextInput placeholder='QcPerson' name='qcPerson' />
                        <MyTextInput placeholder='Releaser' name='releaser' />
                        <MyTextInput placeholder='Cyclotron' name='cyclotron' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit'/>
                        <Button as={Link} to='/synthesisBatches' floated='right' type='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
            
        </Segment>
    )
})