import Foundation
import RxSwift
import RxCocoa

class AdditionalInfoViewModel: NSObject {
    
    private let apiCallCheck = BehaviorRelay(value: "")
    private let contents = BehaviorRelay<[String]>(value: [])
    
    private var storage = PublishRelay<[String]>()
    
    lazy var dataList:Driver<[String]>={
        return storage.asDriver(onErrorJustReturn: [])
    }()
    
    lazy var titleInfo:Driver<String>={
        return apiCallCheck.asDriver(onErrorJustReturn: "")
    }()
    
    lazy var contentInfo:Driver<[String]>={
        return contents.asDriver(onErrorJustReturn: [])
    }()
    
    override init() {
        super.init()
        setupAPI()
    }
    
    func configure(_ value:Int) {
        switch value {
        case 1: apiCallCheck.accept("Milestone")
        case 2: apiCallCheck.accept("Author")
        default: apiCallCheck.accept("Label")
        }
    }
    
    private func setupAPI() {
        apiCallCheck
            .subscribe(onNext: { [weak self] value in
                switch value {
                case "Milestone": self?.getMilestoneDTO()
                case "Author": self?.getAuthorDTO()
                default: self?.getLabelDTO()
                }
            }).disposed(by: rx.disposeBag)
    }
    
    private func getLabelDTO() {
        APIService.shared.getLabelDTO(AdditionalAPI.label)
            .subscribe(onNext: { [weak self] data in
                self?.contents.accept(data.labels.map{$0.name})
            }).disposed(by: rx.disposeBag)
    }
    
    private func getMilestoneDTO() {
        APIService.shared.getMilestoneDTO(AdditionalAPI.milestone)
            .subscribe(onNext: { [weak self] data in
                self?.contents.accept(data.milestones.map{$0.title})
            }).disposed(by: rx.disposeBag)
    }
    
    private func getAuthorDTO() {
        APIService.shared.getAuthorDTO(AdditionalAPI.author)
            .subscribe(onNext: { [weak self] data in
                self?.contents.accept(data.authors.map{$0.userName})
            }).disposed(by: rx.disposeBag)
    }
}
