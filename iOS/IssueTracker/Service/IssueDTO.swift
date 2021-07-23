import Foundation

struct IssueDTO: Decodable {
    let issues: [IssueInfo]
}

struct IssueInfo: Decodable {
    let id:Int
    let title:String
    let comment:String
    let authorAvatarUrl:String
    let createdDateTime:String
    let commentNumber:Int
    let assignees:[Assignee]
    let labels:[Label]
    let milestone:String
}
