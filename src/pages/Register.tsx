import React from 'react';
import FormGroupRegister from '../components/FormGroup/FormGroupRegister';
import ResponsiveAppBar from '../components/NavBar/components/ResponsiveAppBar/ResponsiveAppBar';

const Home: React.FC = () => {
    return (
        <>
            <ResponsiveAppBar />
            <FormGroupRegister />
        </>
    );
};

export default Home;
