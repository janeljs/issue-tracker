export interface IssueItemProps {
  issue: IssuesType;
}

export interface IssuesType {
  assignees: string[];
  author: string;
  comment: string;
  commentNumber: number;
  createdDateTime: string;
  id: number;
  labels: LabelProp[];
  milestone: string;
  title: string;
}

export interface LabelColorType {
  backgroundColorCode: string;
  textColorCode: string;
}

export interface LabelProp {
  id: number;
  name: string;
  color: LabelColorType;
  description: string;
  checked: boolean;
}
