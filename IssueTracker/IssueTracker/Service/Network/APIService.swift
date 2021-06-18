import Foundation
import RxSwift
import Alamofire

class APIService {

    static let shared:APIService = APIService()
    
    func getIssueInfo(_ url:URL) -> Observable<IssueDTO> {
        return get(url)
    }
    
    func getLabelInfo(_ url:URL) -> Observable<LabelDTO> {
        return get(url)
    }
    
    func getMilestoneInfo(_ url:URL) -> Observable<MilestoneDTO> {
        return get(url)
    }
    
    func getAssigneeInfo(_ url:URL) -> Observable<AuthorDTO> {
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
