import Foundation
import RxSwift
import RxCocoa

class FilterViewModel: NSObject {
 
    private let storage = FilterMemoryStorage()
    let selectedFilter = BehaviorRelay<[IssueInfo]>(value: [])
    
    lazy var filterList: Driver<[SectionOfFilterList]> = {
        return storage.filterList()
    }()
        
    func updateInfo(_ labels:[Label], _ milestone:Set<String>, _ assignee:[Assignee]) {
        storage.append(labels)
        storage.append(milestone)
        storage.append(assignee)
    }
    
    func getFilterData(_ info:(Int, String)) {
        guard let url = convertToURL(info.0, info.1) else { return }
        print(url)
        APIService.get(url)
            .subscribe(onNext: { [weak self] issueDTO in
                self?.selectedFilter.accept(issueDTO.issues)
            }, onError: { error in
                print(error)
            }).disposed(by: rx.disposeBag)
    }
    
    private func convertToURL(_ key:Int, _ info:String) -> URL? {
        switch key {
        case 0: return URL(string: FilteredAPI.stauts)
        case 1: return URL(string: FilteredAPI.author+info)
        case 2: return URL(string: FilteredAPI.label+info)
        default:
            return URL(string: FilteredAPI.milestone+info)
        }
    }
}
