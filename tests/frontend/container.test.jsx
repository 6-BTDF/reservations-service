import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Container from '../../client/src/components/Container';
import App from '../../client/src/components/App';

configure({ adapter: new Adapter() });

describe('<Container />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<Container />);
    expect(wrapper.find('img')).toHaveLength(6);
    expect(wrapper.find(App)).toHaveLength(1);
  });
});
