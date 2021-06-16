import Foundation
import RxSwift
import RxCocoa

class FilterViewModel: NSObject {
 
    private let storage = FilterMemoryStorage()
    let selectedFilter = BehaviorRelay<String>(value: "")
    
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
        //API 요청으로 가져온 데이터 IssueListViewModel에 filteredIssue에 bind
    }
    
    private func convertToURL(_ key:Int, _ info:String) -> URL? {
        switch key {
        case 0: return URL(string: "?status=\(info)")
        case 1: return URL(string: "&author=\(info)")
        case 2: return URL(string: "&label=\(info)")
        default:
            return URL(string: "?milestone=\(info)")
        }
    }
}
