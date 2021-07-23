export function timeChecker(createDate: string) {
  const currentTime = new Date().valueOf();
  const createTime = new Date(createDate).valueOf();
  const passedSeconds = (currentTime - createTime) / 1000;
  const min = 60;
  const hour = min * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  if (passedSeconds / year >= 1) return `${Math.ceil(passedSeconds / year)} years ago`;
  if (passedSeconds / month >= 1) return `${Math.ceil(passedSeconds / month)} months ago`;
  if (passedSeconds / day >= 1) return `${Math.ceil(passedSeconds / month)} days ago`;
  if (passedSeconds / hour >= 1) return `${Math.ceil(passedSeconds / hour)} hours ago`;
  if (passedSeconds / min >= 1) return `${Math.ceil(passedSeconds / min)} minutes ago`;
  return 'now';
}
