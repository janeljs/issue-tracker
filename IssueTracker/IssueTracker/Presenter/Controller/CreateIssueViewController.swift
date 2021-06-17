import UIKit
import RxSwift
import RxCocoa
import MarkdownView

class CreateIssueViewController: UIViewController {
    
    @IBOutlet var additionalInfoButton: [UIButton]!
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var commentTextView: UITextView!
    @IBOutlet weak var markDownSegmentControl: UISegmentedControl!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var saveButton: UIButton!
    
    private lazy var mdView: MarkdownView = {
        let md = MarkdownView()
        md.frame = CGRect(x: commentTextView.frame.minX, y: commentTextView.frame.minY, width: commentTextView.frame.width, height: commentTextView.frame.height)
        md.backgroundColor = .white
        return md
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupMainView()
    }
}

//MARK: - Setup
private extension CreateIssueViewController {
    
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
        setupAdditionalInfoButton()
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
                //이슈를 만들어서 보내고 뷰컨트롤러 넘길때 정보도 같이 넘김
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupAdditionalInfoButton() {
        additionalInfoButton.enumerated().forEach { index, button in
            button.rx.tap
                .subscribe(onNext: { [weak self] _ in
                    self?.moveToAdditionalIssueVC(index)
                }).disposed(by: rx.disposeBag)
        }
    }
    
    private func setupNavigationBar() {
        self.navigationController?.navigationBar.barTintColor = .white
        self.navigationController?.navigationBar.shadowImage = UIImage()
    }
    
    private func setupCommentTextView() {
        setupCommentTextViewPlaceHolder()
        
        commentTextView.rx.didBeginEditing
            .subscribe(onNext: {[weak self] in
                self?.setupInitiateTypeText()
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
        commentTextView.text = TextView.placeHolder
        commentTextView.textColor = .lightGray
    }
    
    private func setupInitiateTypeText() {
        commentTextView.text = nil
        commentTextView.textColor = .black
    }
    
    private func setupMarkDownView() {
        view.addSubview(mdView)
        view.insertSubview(mdView, belowSubview: commentTextView)
    }
    
    private func moveMarkDownViewFront() {
        view.bringSubviewToFront(self.mdView)
        DispatchQueue.main.async {
            self.mdView.load(markdown: self.commentTextView.text)
        }
    }
    
    private func moveMarkDownViewBack() {
        view.insertSubview(mdView, belowSubview: commentTextView)
        mdView.subviews.forEach{$0.removeFromSuperview()}
    }
}

//MARK: - Action
private extension CreateIssueViewController {
        
    private func moveToDetailIssueVC(_ issue:IssueInfo) {
        guard let detailVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.detailIssue) else {
            return
        }
        navigationController?.pushViewController(detailVC, animated: true)
    }
    
    private func moveToAdditionalIssueVC(_ info:Int) {
        guard let additionalVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.additionalInfo) as? AdditionalViewController else {
            return
        }
        additionalVC.configure(info)
        present(additionalVC, animated: true, completion: nil)
    }
}
