import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/radioactive.jpg" alt="logo" style={{marginRight: '10px'}}/>
                    SynthesisBatches
                </Menu.Item>
                <Menu.Item name='SynthesisBatches' />
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create SynthesisBatch' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}