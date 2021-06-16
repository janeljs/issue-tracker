import UIKit
import RxSwift
import RxCocoa
import NSObject_Rx
import RxDataSources

class FilterIssueViewController: UIViewController {
    
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var saveButton: UIButton!
    @IBOutlet weak var filterTableView: UITableView!

    private let dataSource = RxTableViewSectionedReloadDataSource<SectionOfFilterList>(configureCell: { dataSource, tableView, indexPath, item in
        guard let cell = tableView.dequeueReusableCell(withIdentifier: FilterCell.identifier, for: indexPath) as? FilterCell else { return UITableViewCell() }
        cell.configure(item.mainInfo)
        return cell
    })
    
    private let viewModel = FilterViewModel()
    private var selectedInfo:String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupFilterTableView()
        setupButtonAction()
        bind()
    }
    
    func configure(_ labels:[Label], _ milestone:Set<String>, _ assignee:[Assignee]) {
        viewModel.updateInfo(labels, milestone, assignee)
    }
}

//MARK: - Setup Button Action
private extension FilterIssueViewController {
    
    private func setupButtonAction() {
        setupIssueCancelButton()
        setupIssueSaveButton()
    }
    
    private func setupIssueCancelButton() {
        cancelButton.rx.tap
            .subscribe(onNext: { [weak self] in
                self?.dismiss(animated: true, completion: nil)
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupIssueSaveButton() {
        saveButton.rx.tap
            .subscribe(onNext: { [weak self] in
                print(self?.selectedInfo)
                self?.dismiss(animated: true, completion: nil)
            }).disposed(by: rx.disposeBag)
    }
}

//MARK: - Setup Table View
private extension FilterIssueViewController {
    
    private func setupFilterTableView() {
        setupTableViewDataSource()
        setupTableViewDelegate()
    }
    
    private func setupTableViewDataSource() {
        dataSource.titleForHeaderInSection = { dataSource, indexPath in
            return dataSource.sectionModels[indexPath].header
        }
    }
    
    private func setupTableViewDelegate() {
        filterTableView.register(FilterCell.self, forCellReuseIdentifier: FilterCell.identifier)
        filterTableView.rx.setDelegate(self).disposed(by: rx.disposeBag)
    }
}

//MARK: - Bind
private extension FilterIssueViewController {
    
    private func bind() {
        bindFilterTableView()
    }
    
    private func bindFilterTableView() {
        viewModel.filterList
            .drive(filterTableView.rx.items(dataSource: dataSource))
            .disposed(by: rx.disposeBag)
        
        Observable
            .zip(filterTableView.rx.itemSelected, filterTableView.rx.modelSelected(FilterList.self))
            .bind { [weak self] indexPath, model in
                self?.filterTableView.cellForRow(at: indexPath)?.isSelected = true
                self?.selectedInfo = model.mainInfo
            }.disposed(by: rx.disposeBag)
        
        filterTableView.rx.itemDeselected
            .subscribe(onNext: { [weak self] indexPath in
                self?.filterTableView.cellForRow(at: indexPath)?.isSelected = false
            }).disposed(by: rx.disposeBag)
    }
}

extension FilterIssueViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return filterTableView.frame.height/15
    }
}
