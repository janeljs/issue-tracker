import Foundation

struct Label: Decodable {
    let id:Int
    let name:String
    let color:LabelColor
    let description:String
    let checked:Bool
}

struct LabelColor: Decodable {
    let backgroundColorCode:String
    let textColorCode:String
}
