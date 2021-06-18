import UIKit

class AdditionalViewController: UIViewController {

    @IBOutlet weak var saveButton: UIButton!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var titleLabel: UILabel!
    private let viewModel = AdditionalInfoViewModel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupMainView()
        bind()
    }
    
    func configure(_ status:Int) {
        viewModel.configure(status)
    }
}

//MARK: - Setup
private extension AdditionalViewController {
    
    private func setupMainView() {
        setupButton()
    }
    
    private func setupButton() {
        setupCancelButton()
    }
    
    private func setupCancelButton() {
        cancelButton.rx.tap
            .subscribe(onNext: { [weak self] _ in
                self?.dismiss(animated: true, completion: nil)
            }).disposed(by: rx.disposeBag)
    }
}

//MARK: - Bind
private extension AdditionalViewController {
    
    private func bind() {
        bindTitleLabel()
    }
    
    private func bindTitleLabel() {
        viewModel.titleInfo
            .drive(titleLabel.rx.text)
            .disposed(by: rx.disposeBag)
    }
}
