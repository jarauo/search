import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer (function SynthesisBatchList() {
    
    const {synthesisBatchStore} = useStore();
    const {deleteSynthesisBatch, synthesisBatchesByStartTime, loading} = synthesisBatchStore;
    const [target, setTarget] = useState('');

    function handleSynthesisBatchDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteSynthesisBatch(id);
    }
    
    return(
        <Segment>
            <Item.Group divided>
                {synthesisBatchesByStartTime.map(synthesisbatch => (
                    <Item key={synthesisbatch.id}>
                        <Item.Content>
                            <Item.Header as='a'>{synthesisbatch.batchNumber}</Item.Header>
                            <Item.Meta>{synthesisbatch.synthesisPerson}</Item.Meta>
                            <Item.Description>
                                <div>{synthesisbatch.startTime},{synthesisbatch.endTime}</div>
                                <div>{synthesisbatch.releaser}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => synthesisBatchStore.selectSynthesisBatch(synthesisbatch.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={synthesisbatch.id}
                                    loading={loading && target === synthesisbatch.id} 
                                    onClick={(e) => handleSynthesisBatchDelete(e,synthesisbatch.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={synthesisbatch.cyclotron} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})