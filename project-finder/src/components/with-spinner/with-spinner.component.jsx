import React from 'react';
import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles.jsx';

//HOC
const WithSpinner = (WrappedComponent) => {
    const Spinner = ({ isFetching, ...otherProps }) => {
        return isFetching ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
                <WrappedComponent {...otherProps} />
            )
    };
    return Spinner;
};

export default WithSpinner;

