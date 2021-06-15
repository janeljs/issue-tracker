import UIKit
import RxSwift
import RxCocoa

class IssueDetailViewController: UIViewController {

    @IBOutlet weak var commentTextView: UITextView!
    @IBOutlet weak var markDownSegmentControl: UISegmentedControl!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var saveButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupMainView()
    }
}

//MARK: - Setup
private extension IssueDetailViewController {
    
    private func setupMainView() {
        setupButtonAction()
        setupMarkDownSegmentControl()
        setupNavigationBar()
        setupCommentTextView()
    }
    
    private func setupButtonAction() {
        setupCancelButton()
        setupSaveButton()
    }
    
    private func setupMarkDownSegmentControl() {
        let font = UIFont.boldSystemFont(ofSize: 12)
        markDownSegmentControl.setTitleTextAttributes([NSAttributedString.Key.font: font], for: .normal)
    }
    
    private func setupCancelButton() {
        cancelButton.rx.tap
            .subscribe(onNext: { [weak self] in
                self?.navigationController?.popViewController(animated: true)
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupSaveButton() {
        saveButton.rx.tap
            .subscribe(onNext: { [weak self] in
                self?.navigationController?.popViewController(animated: true)
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupNavigationBar() {
        self.navigationController?.navigationBar.barTintColor = .white
        self.navigationController?.navigationBar.shadowImage = UIImage()
    }
    
    private func setupCommentTextView() {
        setupCommentTextViewPlaceHolder()
        
        commentTextView.rx.didBeginEditing
            .subscribe(onNext: {[weak self] in
                self?.commentTextView.text = nil
                self?.commentTextView.textColor = .black
            }).disposed(by: rx.disposeBag)
        
        commentTextView.rx.didEndEditing
            .subscribe(onNext: { [weak self] in
                if self?.commentTextView.text.isEmpty != false {
                    self?.setupCommentTextViewPlaceHolder()
                }
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupCommentTextViewPlaceHolder() {
        commentTextView.text = "코멘트를 입력해주세요"
        commentTextView.textColor = .lightGray
    }
}

