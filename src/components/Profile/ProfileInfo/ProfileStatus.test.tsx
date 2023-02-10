import {ProfileStatus} from './ProfileStatus';
import ReactTestRenderer from 'react-test-renderer';

const callback = () => alert('Test callback');
const testStatus = 'Test status';
describe('ProfileStatus component', () => {
    test('status from props should be stored to the state correctly', () => {
        const component = ReactTestRenderer.create(
            <ProfileStatus status={testStatus} updateUserStatus={callback}/>
        );
        const instance = component.root.findByType(ProfileStatus).instance;
        expect(instance.state.status).toBe('Test status');
    });
    test('span should be displayed after its creation', () => {
        const component = ReactTestRenderer.create(
            <ProfileStatus status={testStatus} updateUserStatus={callback}/>
        );
        const span = component.root.findByType('span');
        expect(span).toBeTruthy();
    });
    test('span should display correct status', () => {
        const component = ReactTestRenderer.create(
            <ProfileStatus status={testStatus} updateUserStatus={callback}/>
        );
        const span = component.root.findByType('span');
        expect(span.props.children).toBe('Test status');
    });
    test('after component did mount input should not be displayed', () => {
        const component = ReactTestRenderer.create(
            <ProfileStatus status={testStatus} updateUserStatus={callback}/>
        );
        const inputs = component.root.findAllByType('input');
        expect(inputs).toHaveLength(0);
    });
    test('callback from profile status should be called', () => {
        const mockCallback = jest.fn();
        const component = ReactTestRenderer.create(
            <ProfileStatus status={testStatus} updateUserStatus={mockCallback}/>
        );
        const instance = component.root.findByType(ProfileStatus).instance;
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toBe(testStatus);
    });
});