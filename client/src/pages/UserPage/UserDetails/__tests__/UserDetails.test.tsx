import React from "react";
import format from "date-fns/format";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockUser} from "../../../../util/mockData/mockData";
import UserDetails from "../UserDetails";

describe("UserDetails", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<UserDetails/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.text().includes(mockUser.location)).toBe(true);
        expect(wrapper.text().includes(mockUser.website)).toBe(true);
        expect(wrapper.text().includes(`Date of Birth: ${mockUser.birthday}`)).toBe(true);
        expect(wrapper.text().includes(`Joined: ${format(new Date(mockUser.registrationDate), "MMMM yyyy")}`)).toBe(true);
    });
});
