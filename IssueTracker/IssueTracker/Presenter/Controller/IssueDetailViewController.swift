import UIKit
import RxSwift
import RxCocoa
import MarkdownView

class IssueDetailViewController: UIViewController {

    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var commentTextView: UITextView!
    @IBOutlet weak var markDownSegmentControl: UISegmentedControl!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var saveButton: UIButton!
    
    private let viewModel = IssueDetailViewModel()
    
    private lazy var mdView: MarkdownView = {
        let md = MarkdownView()
        md.frame = CGRect(x: commentTextView.frame.minX, y: commentTextView.frame.minY, width: commentTextView.frame.width, height: commentTextView.frame.height)
        md.backgroundColor = .white
        return md
    }()
    
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
        setupMarkDownView()
    }
    
    private func setupButtonAction() {
        setupCancelButton()
        setupSaveButton()
    }
    
    private func setupMarkDownSegmentControl() {
        let font = UIFont.boldSystemFont(ofSize: 12)
        markDownSegmentControl.setTitleTextAttributes([NSAttributedString.Key.font: font], for: .normal)
        
        markDownSegmentControl.rx.selectedSegmentIndex
            .subscribe(onNext: { [weak self] index in
                switch index {
                case 1:
                    self?.moveMarkDownViewFront()
                default:
                    self?.moveMarkDownViewBack()
                }
            }).disposed(by: rx.disposeBag)
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
        commentTextView.text = TextView.placeHolder
        commentTextView.textColor = .lightGray
    }
    
    private func setupPreviousInfo() {
        if viewModel.previousCheck.value == true { return }
        commentTextView.text = nil
        commentTextView.textColor = .black
    }
    
    private func setupMarkDownView() {
        view.addSubview(mdView)
        view.insertSubview(mdView, belowSubview: commentTextView)
    }
    
    private func moveMarkDownViewFront() {
        DispatchQueue.main.async {
            self.mdView.load(markdown: self.commentTextView.text)
        }
        view.bringSubviewToFront(self.mdView)
    }
    
    private func moveMarkDownViewBack() {
        view.insertSubview(mdView, belowSubview: commentTextView)
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
