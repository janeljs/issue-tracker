import Foundation
import RxDataSources

struct FilterList: Equatable {
    let mainInfo: String
}

struct SectionOfFilterList {
    var header:String
    var items: [Item]
}
extension SectionOfFilterList: SectionModelType {
    typealias Item = FilterList
    
    init(original: SectionOfFilterList, items: [FilterList]) {
        self = original
        self.items = items
    }
}

