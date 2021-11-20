import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
//import SynthesisBatchStore from '../../../app/stores/synthesisBatchStore';
import SynthesisBatchListItem from './SynthesisBatchListItem';

export default observer (function SynthesisBatchList() {
    
    const {synthesisBatchStore} = useStore();
    //const {synthesisBatchesByStartTime} = synthesisBatchStore;
    const {groupedSynthesisBatches} = synthesisBatchStore;
    
    return(
        <>
            {groupedSynthesisBatches.map(([group, synthesisBatches]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                        {synthesisBatches.map(synthesisbatch => (
                            <SynthesisBatchListItem key={synthesisbatch.id} synthesisbatch={synthesisbatch} />
                        ))}
                </Fragment>
            ))}
        </>
        
    )
})