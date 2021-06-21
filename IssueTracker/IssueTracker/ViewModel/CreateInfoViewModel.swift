import Foundation
import RxSwift
import RxCocoa

class CreateInfoViewModel:NSObject {
    
    private let additionalStatus = BehaviorRelay<Int>(value: 0)
    private let labelStatus = BehaviorRelay<String>(value: "")
    private let milestoneStatus = BehaviorRelay<String>(value: "")
    private let authorStatus = BehaviorRelay<String>(value: "")
    
    lazy var labelBind:Driver<String>={
        return labelStatus.asDriver(onErrorJustReturn: "")
    }()
    
    lazy var milestoneBind:Driver<String>={
        return milestoneStatus.asDriver(onErrorJustReturn: "")
    }()
    
    lazy var authorBind:Driver<String>={
        return authorStatus.asDriver(onErrorJustReturn: "")
    }()
    
    func setupStatus(_ info:Int) {
        additionalStatus.accept(info)
    }
    
    func deliveryInfo(_ info:String) {
        switch additionalStatus.value {
        case 0: labelStatus.accept(info)
        case 1: milestoneStatus.accept(info)
        default: authorStatus.accept(info)
        }
    }
}
