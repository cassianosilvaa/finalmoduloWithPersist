import React from 'react';
import FormUserRegister from './components/BasicTextFields/FormUserRegister';

import { Form, FormGroupDiv } from './Style';

const FormGroupRegister: React.FC = () => {
    return (
        <FormGroupDiv>
            <Form>
                <FormUserRegister />
            </Form>
        </FormGroupDiv>
    );
};

export default FormGroupRegister;
