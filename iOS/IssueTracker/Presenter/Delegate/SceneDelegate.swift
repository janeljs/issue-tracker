import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?
    
    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        guard let url = URLContexts.first?.url else { return }
        if url.absoluteString.starts(with: "issuetracker://") {
            if let code = url.absoluteString.split(separator: "=").last.map({String($0)}) {
                LoginManager.requestAccessToken(code)
            }
        }
}
}
