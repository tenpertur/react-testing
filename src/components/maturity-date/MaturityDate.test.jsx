import React from 'react';
import renderer from 'react-test-renderer';
import {MaturityDate} from "Components/maturity-date/MaturityDate";

describe("MaturityDate tests", () => {

    it('renders correctly maturity date', () => {
        const component = <MaturityDate maturityDate="2021-10-11" isLoading={false} isError={false}/>
        const tree = renderer
            .create(component)
            .toJSON()
        expect(tree).toMatchSnapshot();
    })
    it('renders maturity date skeleton when loading', () => {
        const component = <MaturityDate maturityDate="2021-10-11" isLoading={true} isError={false}/>
        const tree = renderer
            .create(component)
            .toJSON()
        expect(tree).toMatchSnapshot();
    })

    it('renders error when error', () => {
        const component = <MaturityDate maturityDate="2021-10-11" isLoading={false} isError={true}/>
        const tree = renderer
            .create(component)
            .toJSON()
        expect(tree).toMatchSnapshot();
    })

})

