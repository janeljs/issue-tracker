import {
  CommentType,
  UserType,
  LabelType,
  MilestoneType,
  LoginUserType,
} from 'components/common/tabModal/tapDataType';
import API, { authorizedHeaders } from './api';

type IssueDetailType = {
  id: number;
  title: string;
  status: boolean;
  createdDateTime: string;
  owner: LoginUserType;
  comments: Array<CommentType> | [];
  assignees: Array<UserType> | [];
  labels: Array<LabelType> | [];
  milestone: MilestoneType | null;
};

export async function fetchIssueDetail(id: number): Promise<IssueDetailType | null> {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(API.ISSUE_DETAIL.GET(id), {
      headers: authorizedHeaders(token),
    });
    const issueDetailData = await response.json();
    return issueDetailData;
  } catch (err) {
    return null;
  }
}

type patchAssigneeType = { id: number; isAssigned: boolean }[];
type patchLabelType = { id: number; isChecked: boolean }[];
type patchMilestoneType = { id: number | null };

export async function editIssueDetailOption(
  issueId: number,
  type: string,
  patchData: patchAssigneeType | patchLabelType | patchMilestoneType | null
) {
  if (!type || !patchData) return;
  const token = localStorage.getItem('token');
  const newValue = type === 'milestone' ? { [type]: patchData } : { [`${type}s`]: patchData };
  try {
    const response = await fetch(API.ISSUE_DETAIL.EDIT.OPTION(issueId, type), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authorizedHeaders(token) },
      body: JSON.stringify(newValue),
    });
    if (response.status === 200) return true;
    else throw Error;
  } catch (error) {
    throw error;
  }
}

export async function getFileURL(formData: any) {
  try {
    const token = localStorage.getItem('token');
    const postFileURL = await fetch(API.ISSUE_DETAIL.EDIT.FILE, {
      method: 'POST',
      headers: authorizedHeaders(token),
      body: formData,
    });
    let fileURL = await postFileURL.json();
    return fileURL;
  } catch (err) {
    throw err;
  }
}

export async function editComments(issueId: number, comment: string, commentId?: number) {
  const token = localStorage.getItem('token');
  const newComment = commentId ? { id: commentId, comment } : { comment };
  try {
    const response = await fetch(API.ISSUE_DETAIL.EDIT.COMMENTS(issueId), {
      method: commentId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json', ...authorizedHeaders(token) },
      body: JSON.stringify(newComment),
    });
    if (response.status === 200) return true;
    else throw Error;
  } catch (error) {
    throw error;
  }
}
