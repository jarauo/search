import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';


export default function NavBar() {

    const {synthesisBatchStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/radioactive.jpg" alt="logo" style={{marginRight: '10px'}}/>
                    SynthesisBatches
                </Menu.Item>
                <Menu.Item name='SynthesisBatches' />
                <Menu.Item>
                    <Button onClick={() => synthesisBatchStore.openForm()} positive content='Create SynthesisBatch' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}