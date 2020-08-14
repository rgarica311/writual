import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mutationobservershim from 'mutationobserver-shim';
Enzyme.configure({adapter: new Adapter()});
