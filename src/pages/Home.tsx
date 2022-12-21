import React from 'react';
import FormGroup from '../components/FormGroup/FormGroup';
import ResponsiveAppBar from '../components/NavBar/components/ResponsiveAppBar/ResponsiveAppBar';

const Home: React.FC = () => {
    return (
        <>
            <ResponsiveAppBar />
            <FormGroup />
        </>
    );
};

export default Home;
