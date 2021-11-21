import React from 'react';
import { observer } from 'mobx-react-lite';
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { SynthesisBatch } from '../../../app/models/synthesisbatch';
import { format } from 'date-fns';

interface Props {
    synthesisBatch: SynthesisBatch
}

export default observer (function SynthesisBatchDetailedInfo({synthesisBatch}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{synthesisBatch.batchNumber}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {format(synthesisBatch.date!, 'dd.MM.yyyy')}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{synthesisBatch.synthesisPerson}, {synthesisBatch.releaser}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})