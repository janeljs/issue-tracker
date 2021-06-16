import Foundation
import RxSwift
import RxCocoa

class FilterMemoryStorage {
    
    private var list:[SectionOfFilterList] = [
        SectionOfFilterList(header: SectionTitle.status, items: [FilterList(mainInfo: SectionContent.opened), FilterList(mainInfo: SectionContent.closed), FilterList(mainInfo: SectionContent.authorByMe), FilterList(mainInfo: SectionContent.assignedToMe), FilterList(mainInfo: SectionContent.repliedByMe)]),
        
        SectionOfFilterList(header: SectionTitle.author, items: []),
        
        SectionOfFilterList(header: SectionTitle.label, items: [FilterList(mainInfo: SectionContent.noLabel)]),
        
        SectionOfFilterList(header: SectionTitle.milestone, items: [])
    ]
    private lazy var store = BehaviorRelay<[SectionOfFilterList]>(value: list)
    
    func filterList() -> Driver<[SectionOfFilterList]> {
        return store.asDriver(onErrorJustReturn: [])
    }
    
    func append(_ label:[Label]) {
        label.forEach {
            let item = FilterList(mainInfo: $0.name)
            list[2].items.append(item)
        }
        store.accept(list)
    }
    
    func append(_ milestone:String) {
        let item = FilterList(mainInfo: milestone)
        list[3].items.append(item)
        store.accept(list)
    }
    
    func append(_ assignee:[Assignee]) {
        assignee.forEach {
            let item = FilterList(mainInfo: $0.userName)
            list[1].items.append(item)
        }
        store.accept(list)
    }
}
