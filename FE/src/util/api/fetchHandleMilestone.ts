import API, { authorizedHeaders } from 'util/api/api';
interface NewMilestoneType {
  [key: string]: string;
}

export async function editMilestone(milestoneID: number, newMilestone: NewMilestoneType) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API.MILESTONE.EDIT(milestoneID), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authorizedHeaders(token),
      },
      body: JSON.stringify(newMilestone),
    });
    if (response.status !== 200) throw new Error('잘못된 요청');
    return response.status;
  } catch (error) {
    console.error(error);
  }
}
export async function fetchCreateMilestone(newMilestone: NewMilestoneType) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API.MILESTONE.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authorizedHeaders(token),
      },
      body: JSON.stringify(newMilestone),
    });
    if (response.status !== 200) throw new Error('잘못된 요청');
    return response.status;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDeleteMilestone(milesetoneID: number) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(API.MILESTONE.DELETE(milesetoneID), {
      method: 'DELETE',
      headers: authorizedHeaders(token),
    });
    if (response.status === 200) return response.status;
    else if (response.status >= 400) throw Error;
  } catch (error) {
    return null;
  }
}
export async function fetchHandleMilestone(status: string, milestoneID: number) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(API.MILESTONE.OPEN_CLOSE(status), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authorizedHeaders(token),
      },
      body: JSON.stringify({ milestoneNumbers: [milestoneID] }),
    });
    if (response.status >= 400) throw new Error(`${response.status}`);
    return response.status;
  } catch (error) {
    console.error('마일스톤 닫기 에러:', error);
    const errorCode = String(error).split(' ')[1];
    return +errorCode;
  }
}
