import '@testing-library/jest-dom/extend-expect';
import "@testing-library/jest-dom";
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

global.React = React; // this also works for other globally available libraries
Enzyme.configure({ adapter: new Adapter() });
