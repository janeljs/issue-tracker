import UIKit
import RxSwift
import RxCocoa

class IssueDetailViewController: UIViewController {

    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var commentTextView: UITextView!
    @IBOutlet weak var markDownSegmentControl: UISegmentedControl!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var saveButton: UIButton!
    
    private let viewModel = IssueDetailViewModel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupMainView()
        bind()
    }
    
    func configure(_ issue:IssueInfo?) {
        guard let issue = issue else { return }
        viewModel.append(issue)
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
                self?.setupPreviousInfo()
            }).disposed(by: rx.disposeBag)
        
        commentTextView.rx.didEndEditing
            .subscribe(onNext: { [weak self] in
                switch self?.commentTextView.text.isEmpty {
                case true:
                    self?.setupCommentTextViewPlaceHolder()
                default:
                    break
                }
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupCommentTextViewPlaceHolder() {
        viewModel.previousCheck.accept(false)
        commentTextView.text = "코멘트를 입력해주세요"
        commentTextView.textColor = .lightGray
    }
    
    private func setupPreviousInfo() {
        if viewModel.previousCheck.value == true { return }
        commentTextView.text = nil
        commentTextView.textColor = .black
    }
}

//MARK: - Bind
private extension IssueDetailViewController {
    
    private func bind() {
        bindPreviousInfo()
    }
    
    private func bindPreviousInfo() {
        guard let issue = viewModel.issueList.value.first else { return }
        titleTextField.text = issue.title
        commentTextView.textColor = .black
        commentTextView.text = issue.comment
    }
}
