import renderer from 'react-test-renderer';
import FHome from '../Components/FHome';

it('render', () => {
    const component = renderer.create(
        <FHome/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
