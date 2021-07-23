import Foundation
import RxSwift
import RxCocoa

class FilterMemoryStorage {
    
    private var list:[SectionOfFilterList] = [
        SectionOfFilterList(header: SectionTitle.status, items: [FilterList(mainInfo: SectionContent.opened), FilterList(mainInfo: SectionContent.closed), FilterList(mainInfo: SectionContent.authorByMe), FilterList(mainInfo: SectionContent.assignedToMe), FilterList(mainInfo: SectionContent.repliedByMe)]),
        
        SectionOfFilterList(header: SectionTitle.author, items: []),
        
        SectionOfFilterList(header: SectionTitle.label, items: [FilterList(mainInfo: SectionContent.noLabel)])
    ]
    private lazy var store = BehaviorRelay<[SectionOfFilterList]>(value: list)
    
    func filterList() -> Driver<[SectionOfFilterList]> {
        return store.asDriver(onErrorJustReturn: [])
    }
}
