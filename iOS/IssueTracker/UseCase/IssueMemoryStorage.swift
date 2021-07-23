import Foundation
import RxSwift
import RxCocoa

protocol MemoryStorageType {
    
    @discardableResult
    func append(_ issues:[IssueInfo]) -> Observable<[IssueInfo]>
    
    @discardableResult
    func issueList() -> Driver<[IssueInfo]>
}

class IssueMemoryStorage: MemoryStorageType {
    
    private var list:[IssueInfo] = []
    private lazy var store = BehaviorRelay<[IssueInfo]>(value: list)
    
    @discardableResult
    func append(_ issues: [IssueInfo]) -> Observable<[IssueInfo]> {
        list.append(contentsOf: issues)
        store.accept(list)
        return Observable.just(issues)
    }
    
    @discardableResult
    func issueList() -> Driver<[IssueInfo]> {
        return store.asDriver(onErrorJustReturn: [])
    }    
}
