import { Dispatch } from "redux";
import {
  getGroups as getGroupsFromApi,
  updateGroup as updateGroupFromApi
} from "../../api/groupsApi";
import IGroup from "../../models/IGroup";
import IStoreState from "../../store/IStoreState";
import keys from "../ActionTypeKeys";
import IGetGroupsFailAction from "./IGetGroupsFailAction";
import IGetGroupsInProgressAction from "./IGetGroupsInProgressAction";
import IGetGroupsSuccessAction from "./IGetGroupsSuccessAction";
import IUpdateGroupFailAction from "./IUpdateGroupFailAction";
import IUpdateGroupInProgressAction from "./IUpdateGroupInProgressAction";
import IUpdateGroupSuccessAction from "./IUpdateGroupSuccessAction";

export function getGroups(): (
  dispatch: Dispatch<IStoreState>
) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    // Signal work in progress.
    dispatch(getGroupsInProgress());

    try {
      const groups: IGroup[] = await getGroupsFromApi();

      dispatch(getGroupsSuccess(groups));
    } catch (err) {
      dispatch(getGroupsFail(err));
    }
  };
}

export function updateGroup(
  group: IGroup
): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    // Signal work in progress.
    dispatch(updateGroupInProgress());

    try {
      const updatedGroup: IGroup = await updateGroupFromApi(group);

      dispatch(updateGroupSuccess(updatedGroup));
    } catch (err) {
      dispatch(updateGroupFail(err));
    }
  };
}

function getGroupsInProgress(): IGetGroupsInProgressAction {
  return {
    type: keys.GET_GROUPS_INPROGRESS
  };
}

function getGroupsSuccess(groups: IGroup[]): IGetGroupsSuccessAction {
  return {
    payload: {
      groups
    },
    type: keys.GET_GROUPS_SUCCESS
  };
}

function getGroupsFail(error: Error): IGetGroupsFailAction {
  return {
    payload: {
      error
    },
    type: keys.GET_GROUPS_FAIL
  };
}

function updateGroupInProgress(): IUpdateGroupInProgressAction {
  return {
    type: keys.UPDATE_GROUP_INPROGRESS
  };
}

function updateGroupSuccess(group: IGroup): IUpdateGroupSuccessAction {
  return {
    payload: {
      group
    },
    type: keys.UPDATE_GROUP_SUCCESS
  };
}

function updateGroupFail(error: Error): IUpdateGroupFailAction {
  return {
    payload: {
      error
    },
    type: keys.UPDATE_GROUP_FAIL
  };
}
