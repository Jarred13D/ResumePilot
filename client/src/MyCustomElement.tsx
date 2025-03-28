import React from 'react';

interface MyCustomElementProps {
    customProp: string;
}

const MyCustomElement: React.FC<MyCustomElementProps> = ({ customProp }) => {
    return <div>{customProp}</div>;
};

export default MyCustomElement;