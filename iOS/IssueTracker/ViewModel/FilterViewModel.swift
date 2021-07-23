import Foundation
import RxSwift
import RxCocoa

class FilterViewModel: NSObject {
 
    private let storage = FilterMemoryStorage()
    let selectedFilter = BehaviorRelay<String>(value: "")
    
    lazy var filterList: Driver<[SectionOfFilterList]> = {
        return storage.filterList()
    }()
    
}
