import Foundation

struct IssueDTO: Decodable {
    let issues: [IssueInfo]
}

struct IssueInfo: Decodable {
    let id:Int
    var title:String
    var comment:String
    let authorAvatarUrl:String
    let createdDateTime:String
    let commentNumber:Int
    var assignees:[Assignee]
    var labels:[Label]
    var milestone:String
}
