import UIKit

class RedirectionViewController: UIViewController {
    
    private lazy var errorAlert: UIAlertController =  {
        let alert = UIAlertController(title: "Error", message: "로그인이 실패하였습니다.", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "확인", style: .default, handler: .none))
        return alert
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupObserver()
    }
}

private extension RedirectionViewController {
    
    private func setupObserver() {
        LoginObserver.validLoginTry.addObserver().bind { [weak self] object in
            guard let _ = object as? LoginDTO else { return }
            self?.moveToNextVC()
        }.disposed(by: rx.disposeBag)
        
        LoginObserver.InvalidLoginTry.addObserver().bind { [weak self] _ in
            guard let errorAlert = self?.errorAlert else { return }
            self?.present(errorAlert, animated: true, completion: nil)
            self?.dismiss(animated: true, completion: nil)
        }.disposed(by: rx.disposeBag)
    }
    
    private func moveToNextVC() {
        guard let issueVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.tabBar) else { return }
        issueVC.modalPresentationStyle = .fullScreen
        present(issueVC, animated: true, completion: nil)
    }
}
