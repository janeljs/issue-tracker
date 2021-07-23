export default function ImgParser(comment: string) {
  const matchedLink = /\!\[([^\]]+)\]\(([^\)]+)\)/g;
  let stringComment = comment.replace(matchedLink, '');
  let imgURL1 = comment.match(matchedLink) as Array<string>;

  if (!imgURL1) return null;

  let imgURL = imgURL1[0].replace(matchedLink, `$2 $1`).split(' ');
  return { comment: stringComment, imgLink: imgURL[0], imgDescription: imgURL[1] };
}
