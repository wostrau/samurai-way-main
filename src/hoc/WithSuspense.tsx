import React, { ComponentType, PropsWithChildren } from 'react';
import {Preloader} from '../components/common/Preloader/Preloader';

type Props = PropsWithChildren<{}>

export const withSuspense = (Component: ComponentType) => {
    return (props: Props) => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <Component {...props} />
            </React.Suspense>
        )
    }
};

