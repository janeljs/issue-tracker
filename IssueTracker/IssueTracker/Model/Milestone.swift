import Foundation

struct Milestone:Decodable {
    let id:Int
    let title:String
    let description:String
    let createdDateTime:String
    let dueData:String
    let openedIssueCount:Int
    let closedIssueCount:Int
}
