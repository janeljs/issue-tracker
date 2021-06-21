import Foundation
import RxDataSources

struct FilterList: Equatable {
    let mainInfo: String
}

struct SectionOfFilterList {
    var header:String
    var items: [FilterList]
}
extension SectionOfFilterList: SectionModelType {
    
    init(original: SectionOfFilterList, items: [FilterList]) {
        self = original
        self.items = items
    }
}

