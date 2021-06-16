import Foundation
import RxSwift
import RxCocoa

class FilterViewModel: NSObject {
 
    private let storage = FilterMemoryStorage()
    let selectedFilter = BehaviorRelay<String>(value: "")
    
    lazy var filterList: Driver<[SectionOfFilterList]> = {
        return storage.filterList()
    }()
    
    func updateInfo(_ labels:[Label], _ milestone:String, _ assignee:[Assignee]) {
        storage.append(labels)
        storage.append(milestone)
        storage.append(assignee)
    }
}
