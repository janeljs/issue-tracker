import UIKit
import RxSwift
import RxCocoa

protocol AdditionalInfoProtocol:AnyObject {
    func delivery(_ info:String)
}

class AdditionalViewController: UIViewController {

    @IBOutlet weak var addtionalTableView: UITableView!
    @IBOutlet weak var saveButton: UIButton!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var titleLabel: UILabel!
    
    weak var delegate: AdditionalInfoProtocol?
    private let viewModel = AdditionalInfoViewModel()
    private var selectedData = ""
    
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
        setupTableViewTouchDelegate()
    }
    
    private func setupButton() {
        setupCancelButton()
        setupSaveButton()
    }
    
    private func setupCancelButton() {
        cancelButton.rx.tap
            .subscribe(onNext: { [weak self] _ in
                self?.dismiss(animated: true, completion: nil)
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupSaveButton() {
        saveButton.rx.tap
            .subscribe(onNext: { [weak self] _ in
                self?.delegate?.delivery(self?.selectedData ?? "")
                self?.dismiss(animated: true, completion: nil)
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupTableViewTouchDelegate() {
        Observable
            .zip(addtionalTableView.rx.itemSelected, addtionalTableView.rx.modelSelected(String.self))
            .bind { [weak self] indexPath, model in
                let cell = self?.addtionalTableView.cellForRow(at: indexPath)
                cell?.textLabel?.font = .boldSystemFont(ofSize: cell?.textLabel?.font.pointSize ?? 0)
                self?.selectedData = model
            }.disposed(by: rx.disposeBag)
        
        addtionalTableView.rx.itemDeselected
            .subscribe(onNext: { [weak self] indexPath in
                let cell = self?.addtionalTableView.cellForRow(at: indexPath)
                cell?.textLabel?.font = .none
            }).disposed(by: rx.disposeBag)
    }
}

//MARK: - Bind
private extension AdditionalViewController {
    
    private func bind() {
        bindTitleLabel()
        bindTableView()
    }
    
    private func bindTitleLabel() {
        viewModel.titleInfo
            .drive(titleLabel.rx.text)
            .disposed(by: rx.disposeBag)
    }
    
    private func bindTableView() {
        viewModel.contentInfo
            .drive(addtionalTableView.rx.items(cellIdentifier: "AddtionalCell", cellType: UITableViewCell.self)) { _, data, cell in
                cell.textLabel?.text = data
            }.disposed(by: rx.disposeBag)
    }
}
