import Foundation
import RxSwift
import RxCocoa

class IssueDetailViewModel {
    
    private let issueInfo = BehaviorRelay<[IssueInfo]>(value: [])
    let previousCheck = BehaviorRelay<Bool>(value: false)
    
    lazy var issueList:BehaviorRelay<[IssueInfo]> = {
        return issueInfo
    }()
    
    func append(_ issue:IssueInfo) {
        issueInfo.accept([issue])
        previousCheck.accept(true)
    }
}
