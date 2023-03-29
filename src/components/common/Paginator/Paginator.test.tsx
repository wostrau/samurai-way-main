import React from 'react';
import {create} from 'react-test-renderer';
import {Paginator} from './Paginator';

describe('Paginator component', () => {
    test('pages count is 11 but should showed in a portion only 10', () => {
        const component = create(<Paginator
            pageSize={1}
            currentPage={1}
            portionSize={10}
            totalUsersCount={11}
            onPageChanged={()=>{}}
        />);
        let spans = component.root.findAllByType('span');
        expect(spans.length).toBe(10);
    });
    test('if number of pages more than 10 next button should be displayed', () => {
        const component = create(<Paginator
            pageSize={1}
            currentPage={1}
            portionSize={10}
            totalUsersCount={11}
            onPageChanged={()=>{}}
        />);
        let button = component.root.findAllByType('button');
        expect(button.length).toBe(1);
    });
});