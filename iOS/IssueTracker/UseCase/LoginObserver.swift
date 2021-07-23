import Foundation
import RxSwift

protocol NotificationProtocol {
    var name: Notification.Name { get }
}

extension NotificationProtocol {
    
    func addObserver() -> Observable<Any?> {
        return NotificationCenter.default.rx.notification(self.name).map{$0.object}
    }
    
    func post(object: Any? = nil) {
        NotificationCenter.default.post(name: self.name, object: object, userInfo: nil)
    }
}

enum LoginObserver: NotificationProtocol {
    
    case validLoginTry
    case InvalidLoginTry
    
    var name: Notification.Name {
        switch self {
        case .validLoginTry: return Notification.Name("validLoginTry")
        case .InvalidLoginTry: return Notification.Name("InvalidLoginTry")
        }
    }
}
