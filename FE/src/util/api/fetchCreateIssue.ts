import API, { authorizedHeaders } from 'util/api/api';

type inputsType = {
  title?: string;
  comment: string;
  assignees: number[] | [];
  labels: number[] | [];
  milestone: number | null;
};

export default async function fetchCreateIssue(issueInputs: inputsType) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(API.ISSUE_MAIN.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authorizedHeaders(token),
      },
      body: JSON.stringify(issueInputs),
    });
    if (response.status !== 200) throw new Error('잘못된 요청입니다.');
    const issueID = response.json();
    return issueID;
  } catch (err) {
    throw new Error('잘못된 요청입니다.');
  }
}

export async function fetchIssueOpen(issueNumber: number) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(API.ISSUE_DETAIL.OPEN, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authorizedHeaders(token),
      },
      body: JSON.stringify({ issueNumbers: [issueNumber] }),
    });
    if (response.status !== 200) throw new Error('잘못된 요청입니다.');
    return response.status;
  } catch (err) {
    throw new Error('잘못된 요청입니다.');
  }
}
export async function fetchIssueClose(issueNumber: number) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(API.ISSUE_DETAIL.CLOSE, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authorizedHeaders(token),
      },
      body: JSON.stringify({ issueNumbers: [issueNumber] }),
    });
    if (response.status !== 200) throw new Error('잘못된 요청입니다.');
    return response.status;
  } catch (err) {
    throw new Error('잘못된 요청입니다.');
  }
}
