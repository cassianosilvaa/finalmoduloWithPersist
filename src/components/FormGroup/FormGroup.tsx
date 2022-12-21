import React from 'react';
import FormUser from './components/BasicTextFields/FormUser';

import { Form, FormGroupDiv } from './Style';

const FormGroup: React.FC = () => {
    return (
        <FormGroupDiv>
            <Form>
                <FormUser />
            </Form>
        </FormGroupDiv>
    );
};

export default FormGroup;
