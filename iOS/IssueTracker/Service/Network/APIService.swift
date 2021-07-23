import Foundation
import RxSwift
import Alamofire

protocol NetworkPort {
    static func get(_ url:URL?) -> Observable<IssueDTO>
}

class APIService:NetworkPort {
    
    static func get(_ url: URL?) -> Observable<IssueDTO> {
        return Observable.create { observer in
            guard let url = url else { return Disposables.create()}
            AF.request(url, method: .get)
                .responseDecodable(of: IssueDTO.self) { response in
                    switch response.result {
                    case .failure(let error):
                        observer.onError(error)
                    case .success(let data):
                        observer.onNext(data)
                        observer.onCompleted()
                    }
                }
            return Disposables.create()
        }
    }
}
