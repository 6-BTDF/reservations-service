import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { act } from 'react-dom/test-utils';
// import axios from 'axios';
import App from '../../client/src/components/App';
import DateSelection from '../../client/src/components/DateSelection';
import CheckingDropDown from '../../client/src/components/CheckingDropDown';
import Guests from '../../client/src/components/Guests';
import GuestsDropDown from '../../client/src/components/GuestsDropDown';
import styles from '../../client/src/components/App.css';

configure({ adapter: new Adapter() });
// jest.mock('axios');

describe('<App />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(DateSelection)).toHaveLength(1);
    expect(wrapper.find(`.${styles.mainContainer}`)).toHaveLength(1);
  });
  it('Successfully renders the date selection dropdown', async () => {
    // const data = [
    //   {
    //     fees: {
    //       pernight: 175,
    //       cleaning: 21,
    //       service: 7,
    //     },
    //     reserved: [],
    //     id: 0,
    //     owner: 'Monique Morissette',
    //     name: 'Boyer - Bailey Electronics Cliffs',
    //   },
    // ];
    // await axios.get.mockImplementationOnce(() => Promise.resolve(data));
    // const wrapper = mount(<App />);
    // await wrapper.update();
    // await wrapper.find(DateSelection).simulate('click');
    // await expect(wrapper.find(CheckingDropDown)).toHaveLength(1);
    const wrapper = mount(<App />);
    wrapper.find(DateSelection).simulate('click');
    expect(wrapper.find(CheckingDropDown)).toHaveLength(1);
  });
  it('Succesfully renders the guest dropdown menu', () => {
    const wrapper = mount(<App />);
    wrapper.find(Guests).simulate('click');
    expect(wrapper.find(GuestsDropDown)).toHaveLength(1);
  });
});
