import Foundation

struct Label: Decodable {
    let id:Int
    let name:String
    let color:Color
    let description:String
    let checked:Bool
}

struct Color: Decodable {
    let backgroundColorCode:String
    let textColorCode:String
}
