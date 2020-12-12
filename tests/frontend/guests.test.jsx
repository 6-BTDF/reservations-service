import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../client/src/components/App';
import Guests from '../../client/src/components/Guests';
import GuestsDropDown from '../../client/src/components/GuestsDropDown';
import stylesGuests from '../../client/src/components/Guests.css';
import stylesDropdown from '../../client/src/components/GuestsDropDown.css';

configure({ adapter: new Adapter() });

describe('<Guests />', () => {
  const mockFn = jest.fn();
  const mockProps = {
    dropdown: mockFn,
    guestsNum: 1,
    infantsNum: 0,
    guestsBool: false,
  };
  it('Renders without crashing', () => {
    const wrapper = shallow(<Guests props={mockProps} />);
    expect(wrapper.find(`.${stylesGuests.guests}`)).toHaveLength(1);
  });
  it('Disables buttons when at 1 count for adults and 0 count for children/infants', () => {
    const wrapper = shallow(<GuestsDropDown props={mockProps} />);
    expect(wrapper.find(`.${stylesDropdown.minusButton}`).at(0).props().disabled).toBe(true);
    expect(wrapper.find(`.${stylesDropdown.minusButton}`).at(1).props().disabled).toBe(true);
    expect(wrapper.find(`.${stylesDropdown.minusButton}`).at(2).props().disabled).toBe(true);
  });
  it('Increments the guests count', () => {
    const wrapper = mount(<App />);
    wrapper.find(Guests).simulate('click');
    wrapper.find(`.${stylesDropdown.addButton}`).at(0).simulate('click');
    expect(wrapper.find(`#${stylesGuests.guestsString}`).text()).toEqual('2 guests');
    expect(wrapper.find(`.${stylesDropdown.adultsButton}`).text()).toEqual('- 2 +');
    wrapper.find(`.${stylesDropdown.addButton}`).at(1).simulate('click');
    expect(wrapper.find(`.${stylesDropdown.childrenButton}`).text()).toEqual('- 1 +');
    expect(wrapper.find(`#${stylesGuests.guestsString}`).text()).toEqual('3 guests');
  });
  it('Doesn\'t have the guest count change on infant count change', () => {
    const wrapper = mount(<App />);
    wrapper.find(Guests).simulate('click');
    wrapper.find(`.${stylesDropdown.addButton}`).at(2).simulate('click');
    expect(wrapper.find(`#${stylesGuests.guestsString}`).text()).toEqual('1 guest, 1 infant');
  });
  it('Closes the dropdown when the close button is clicked', () => {
    const wrapper = mount(<App />);
    wrapper.find(Guests).simulate('click');
    wrapper.find(`#${stylesDropdown.closeButton}`).simulate('click');
    expect(wrapper.find(GuestsDropDown)).toHaveLength(0);
  });
  it('Changes the count correctly after incrementing and decrementing', () => {
    const wrapper = mount(<App />);
    wrapper.find(Guests).simulate('click');
    wrapper.find(`.${stylesDropdown.addButton}`).at(0).simulate('click');
    wrapper.find(`.${stylesDropdown.addButton}`).at(0).simulate('click');
    wrapper.find(`.${stylesDropdown.addButton}`).at(1).simulate('click');
    wrapper.find(`.${stylesDropdown.addButton}`).at(2).simulate('click');
    expect(wrapper.find(`#${stylesGuests.guestsString}`).text()).toEqual('4 guests, 1 infant');
    wrapper.find(`.${stylesDropdown.minusButton}`).at(0).simulate('click');
    wrapper.find(`.${stylesDropdown.minusButton}`).at(0).simulate('click');
    wrapper.find(`.${stylesDropdown.minusButton}`).at(1).simulate('click');
    wrapper.find(`.${stylesDropdown.minusButton}`).at(2).simulate('click');
    expect(wrapper.find(`#${stylesGuests.guestsString}`).text()).toEqual('1 guest');
  });
});
