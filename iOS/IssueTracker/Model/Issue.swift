import Foundation

struct Issue: Equatable, Decodable {
    let title:String
    let comment:String
    let assignees:[Int]
    let labels:[Int]
    let milestone:Int
}
