import {AxiosResponse} from "axios";

import {acceptFollowRequests, declineFollowRequests, fetchFollowerSaga, fetchFollowRequests} from "../sagas";
import {
    acceptFollowRequest,
    declineFollowRequest,
    fetchFollowerRequests,
    processFollowRequest,
    setFollowerRequests,
    setFollowerRequestsLoadingState
} from "../actionCreators";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/testHelper";
import {UserApi} from "../../../../services/api/userApi";
import {FollowerUserResponse} from "../../../types/user";
import {setFollowersSize, setUserLoadingStatus} from "../../user/actionCreators";
import {FollowerRequestsActionsType} from "../contracts/actionTypes";
import {LoadingStatus} from "../../../types/common";

describe("fetchFollowerSaga:", () => {
    
    describe("fetchFollowerRequests:", () => {
        const mockFollowerUserResponse = {
            data: [{id: 1}, {id: 2}],
            headers: {"page-total-count": 1}
        } as AxiosResponse<FollowerUserResponse[]>;
        const worker = fetchFollowRequests(fetchFollowerRequests(1));

        testLoadingStatus(worker, setFollowerRequestsLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getFollowerRequests, 1);
        testSetResponse(worker, mockFollowerUserResponse, setFollowerRequests,mockExpectedResponse(mockFollowerUserResponse), "FollowerUserResponse");
        testLoadingStatus(worker, setFollowerRequestsLoadingState, LoadingStatus.ERROR)
    });

    describe("acceptFollowRequest:", () => {
        const worker = acceptFollowRequests(acceptFollowRequest(1));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.acceptFollowRequest, 1);
        testSetResponse(worker, {}, setFollowersSize, {}, "void");
        testSetResponse(worker, {}, processFollowRequest, 1, "void");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR)
    });

    describe("declineFollowRequest:", () => {
        const worker = declineFollowRequests(declineFollowRequest(1));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.declineFollowRequest, 1);
        testSetResponse(worker, {}, processFollowRequest, 1, "void");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR)
    });

    testWatchSaga(fetchFollowerSaga, [
        {actionType: FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS, workSaga: fetchFollowRequests},
        {actionType: FollowerRequestsActionsType.ACCEPT_FOLLOW_REQUEST, workSaga: acceptFollowRequests},
        {actionType: FollowerRequestsActionsType.DECLINE_FOLLOW_REQUEST, workSaga: declineFollowRequests},
    ]);
});
