import React from 'react';
import Helmet from 'react-helmet';

const Title = ({ title }) => {
    const defaultTitle = '⚛️ app';
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};

export { Title };
