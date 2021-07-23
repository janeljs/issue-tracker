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
        let cell = tableView.dequeueReusableCell(withIdentifier: FilterCell.identifier, for: indexPath) as! FilterCell
        cell.configure(item.mainInfo)
        return cell
    })
    
    private let viewModel = FilterViewModel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupMainView()
        bind()
    }
}

private extension FilterIssueViewController {
    
    private func setupMainView() {
        setupIssueCancelButton()
        setupIssueSaveButton()
        setupDataSource()
        setupFilterTableView()
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
                self?.dismiss(animated: true, completion: nil)
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupDataSource() {
        dataSource.titleForHeaderInSection = { dataSource, indexPath in
            return dataSource.sectionModels[indexPath].header
        }
    }
    
    private func setupFilterTableView() {
        filterTableView.register(FilterCell.self, forCellReuseIdentifier: FilterCell.identifier)
        filterTableView.rx.setDelegate(self).disposed(by: rx.disposeBag)
    }
}

private extension FilterIssueViewController {
    
    private func bind() {
        bindFilterTableView()
    }
    
    private func bindFilterTableView() {
        viewModel.filterList
            .drive(filterTableView.rx.items(dataSource: dataSource))
            .disposed(by: rx.disposeBag)
        
        filterTableView.rx.itemSelected
            .subscribe(onNext: { [weak self] indexPath in
                let cell = self?.filterTableView.cellForRow(at: indexPath) as! FilterCell
                cell.isSelected(true)
            }).disposed(by: rx.disposeBag)
        
        filterTableView.rx.itemDeselected
            .subscribe(onNext: { [weak self] indexPath in
                let cell = self?.filterTableView.cellForRow(at: indexPath) as! FilterCell
                cell.isSelected(false)
            }).disposed(by: rx.disposeBag)
    }
}

extension FilterIssueViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return filterTableView.frame.height/15
    }
}
