import UIKit
import RxSwift
import RxCocoa
import NSObject_Rx

class LoginViewController: UIViewController {

    @IBOutlet weak var githubLogInButton: UIButton!
    @IBOutlet weak var logInButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupButtonAction()
    }
}

//MARK: - Setup Button Action
private extension LoginViewController {
    
    private func setupButtonAction() {
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
                self?.moveToRedirectionVC()
            }).disposed(by: rx.disposeBag)
    }
    
    private func moveToRedirectionVC() {
        guard let redirectionVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.redirection) else { return }
        redirectionVC.modalPresentationStyle = .fullScreen
        present(redirectionVC, animated: true, completion: nil)
    }
    
    private func moveToNextVC() {
        guard let issueVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.tabBar) else { return }
        issueVC.modalPresentationStyle = .fullScreen
        present(issueVC, animated: true, completion: nil)
    }
}
