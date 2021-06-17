import Foundation
import RxSwift
import RxCocoa

class AdditionalInfoViewModel: NSObject {
    
    let apiCallCheck = BehaviorRelay(value: 0)
    
    private var storage = PublishRelay<[String]>()
    
    lazy var dataList:Driver<[String]>={
        return storage.asDriver(onErrorJustReturn: [])
    }()
    
    override init() {
        super.init()
        setupCallAPI()
    }
    
    func configure(_ value:Int) {
        apiCallCheck.accept(value)
    }
    
    private func setupCallAPI() {
        apiCallCheck
            .subscribe(onNext: { value in
                switch value {
                case 1: break
                case 2: break
                default:
                    break
                }
            }).disposed(by: rx.disposeBag)
    }
}
