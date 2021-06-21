import Foundation
import RxSwift
import RxCocoa

protocol MemoryStorageType {
    
    @discardableResult
    func append(_ issues:[IssueInfo]) -> Observable<[IssueInfo]>
    
    @discardableResult
    func issueList() -> Driver<[IssueInfo]>
    
    @discardableResult
    func update(_ issue:IssueInfo, _ index:Int) -> Observable<IssueInfo>
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
    
    @discardableResult
    func update(_ issue: IssueInfo, _ index:Int) -> Observable<IssueInfo> {
        list.remove(at: index)
        list.insert(issue, at: index)
        store.accept(list)
        return Observable.just(issue)
    }
    
    func checkIndexRedundant(of issue: IssueInfo) -> Int? {
        guard let index = list.firstIndex(where: { $0.id == issue.id}) else {
            return nil
        }
        return index
    }
}
