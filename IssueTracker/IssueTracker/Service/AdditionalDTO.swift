import Foundation

struct LabelDTO: Decodable {
    let labelsCount:Int
    let milestonesCount:Int
    let labels:[Label]
}

struct MilestoneDTO:Decodable {
    let labelsCount:Int
    let milestonesCount:Int
    let labels:[Milestone]
}

struct AuthorDTO:Decodable {
    let authors:[Author]
}
