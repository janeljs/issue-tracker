import UIKit
import RxSwift
import RxCocoa

class IssueDetailViewController: UIViewController {

//    @IBOutlet weak var saveButton: UIBarButtonItem!
    @IBOutlet weak var cancelButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupMainView()
    }
}

//MARK: - Setup
private extension IssueDetailViewController {
    
    private func setupMainView() {
        setupButtonAction()
    }
    
    private func setupButtonAction() {
        setupCancelButton()
        //setupSaveButton()
    }
    
    private func setupCancelButton() {
        cancelButton.rx.tap
            .subscribe(onNext: { [weak self] in
                self?.navigationController?.popViewController(animated: true)
            }).disposed(by: rx.disposeBag)
    }
//    
//    private func setupSaveButton() {
//        saveButton.rx.tap
//            .subscribe(onNext: { [weak self] in
//                self?.dismiss(animated: true, completion: nil)
//            }).disposed(by: rx.disposeBag)
//    }
}
