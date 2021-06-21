import Foundation

struct LabelDTO: Decodable {
    let labelsCount:Int
    let milestonesCount:Int
    let labels:[Label]
}

struct MilestoneDTO:Decodable {
    let labelsCount:Int
    let milestonesCount:Int
    let milestones:[Milestone]
}

struct AuthorDTO:Decodable {
    let authors:[Author]
}
