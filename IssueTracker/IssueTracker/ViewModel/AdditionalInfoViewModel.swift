import Foundation
import RxSwift
import RxCocoa

class AdditionalInfoViewModel: NSObject {
    
    let apiCallCheck = BehaviorRelay(value: "")
    
    private var storage = PublishRelay<[String]>()
    
    lazy var dataList:Driver<[String]>={
        return storage.asDriver(onErrorJustReturn: [])
    }()
    
    lazy var titleInfo:Driver<String>={
        return apiCallCheck.asDriver(onErrorJustReturn: "")
    }()
    
    func configure(_ value:Int) {
        switch value {
        case 1: apiCallCheck.accept("Milestone")
        case 2: apiCallCheck.accept("Author")
        default: apiCallCheck.accept("Label")
        }
    }
}
