import Foundation
import RxSwift
import Alamofire

class APIService {

    static let shared:APIService = APIService()
    
    func getIssueInfo(_ url:URL) -> Observable<IssueDTO> {
        return get(url)
    }
    
    private func get<T: Decodable>(_ url: URL) -> Observable<T> {
        return Observable.create { observer in
            AF.request(url, method: .get)
                .responseDecodable(of: T.self) { response in
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
