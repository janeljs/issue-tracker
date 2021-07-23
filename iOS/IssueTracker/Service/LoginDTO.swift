import Foundation

struct LoginDTO:Decodable {
    let avatarUrl:String
    let email:String?
    let name:String
    let token:String
    let userName:String
}
