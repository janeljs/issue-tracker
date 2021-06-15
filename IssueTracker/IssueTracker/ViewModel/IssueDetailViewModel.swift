import Foundation
import RxSwift
import RxCocoa

class IssueDetailViewModel {
    
    private let issueInfo = BehaviorRelay<[IssueInfo]>(value: [])
    
    lazy var issueList:BehaviorRelay<[IssueInfo]> = {
        return issueInfo
    }()
    
    func append(_ issue:IssueInfo) {
        issueInfo.accept([issue])
    }
}
