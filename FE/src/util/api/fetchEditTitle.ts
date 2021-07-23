import API, { authorizedHeaders } from 'util/api/api';

export default async function fetchEditTitle(IsssueID: number, title: string) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(API.ISSUE_DETAIL.EDIT.TITLE(IsssueID), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authorizedHeaders(token) },
      body: JSON.stringify({ title: title }),
    });
    const editedTitle = await response.json();
    return editedTitle.title;
  } catch (error) {
    console.log(error);
  }
}
