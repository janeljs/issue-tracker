import UIKit
import RxSwift
import RxCocoa
import NSObject_Rx

class LoginViewController: UIViewController {

    @IBOutlet weak var githubLogInButton: UIButton!
    @IBOutlet weak var logInButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupButton()
    }
}

private extension LoginViewController {
    
    private func setupButton() {
        setupLoginButton()
        setupGithubLoginButton()
    }
    
    private func setupLoginButton() {
        logInButton.rx.tap
            .subscribe(onNext: { [weak self] in
                self?.moveToNextVC()
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupGithubLoginButton() {
        githubLogInButton.rx.tap
            .subscribe(onNext: { [weak self] _ in
                LoginManager.loginPost(API.githubLogin)
                guard let redirectionVC = self?.storyboard?.instantiateViewController(withIdentifier: ViewControllerID.redirection) else { return }
                redirectionVC.modalPresentationStyle = .fullScreen
                self?.present(redirectionVC, animated: true, completion: nil)
            }).disposed(by: rx.disposeBag)
    }
    
    private func moveToNextVC() {
        guard let issueVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.tabBar) else { return }
        issueVC.modalPresentationStyle = .fullScreen
        present(issueVC, animated: true, completion: nil)
    }
}
