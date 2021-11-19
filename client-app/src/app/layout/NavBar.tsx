import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/radioactive.jpg" alt="logo" style={{marginRight: '10px'}} />
                    SynthesisBatches
                </Menu.Item>
                <Menu.Item as={NavLink} to='/synthesisBatches' name='SynthesisBatches' />
                <Menu.Item>
                    <Button as={NavLink} to='/createSynthesisBatch' positive content='Create SynthesisBatch' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}