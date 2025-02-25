import React from "react";

import {mountWithStore} from "../../../../../util/testHelper";
import SnoozeNotifications from "../SnoozeNotifications";

describe("SnoozeNotifications", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<SnoozeNotifications fullName={"test_fullName"}/>);
        expect(wrapper.text().includes(`Snooze notifications from test_fullName`)).toBe(true);
    });
});
