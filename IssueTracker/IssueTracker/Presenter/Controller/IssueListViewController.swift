import UIKit
import RxSwift
import RxCocoa
import NSObject_Rx

class IssueListViewController: UIViewController {

    @IBOutlet weak var issueCollectionView: UICollectionView!
    @IBOutlet weak var issueFilterButton: UIButton!
    @IBOutlet weak var newIssueButton: UIButton!
    
    private let viewModel = IssueListViewModel()
    
    private lazy var searchController: UISearchController = {
        let controller = UISearchController(searchResultsController: nil)
        controller.obscuresBackgroundDuringPresentation = false
        definesPresentationContext = true
        return controller
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setMainView()
        bind()
    }
}

//MARK: - Setup
private extension IssueListViewController {
    
    private func setMainView() {
        setupIssueFilterButton()
        setupRefreshControl()
        setupCollectionView()
    }
    
    private func setupCollectionView() {
        setupDelegate()
        setupCellTouched()
    }

    private func setupRefreshControl() {
        issueCollectionView.refreshControl = UIRefreshControl()
        issueCollectionView.refreshControl?.addTarget(self, action: #selector(refresh), for: .allEvents)
    }
    
    private func setupSearchController() {
        navigationItem.searchController = self.searchController
        self.navigationController?.navigationBar.barTintColor = .white
        self.navigationController?.navigationBar.shadowImage = UIImage()
    }
    
    private func setupCellTouched() {
        issueCollectionView.rx.modelSelected(IssueInfo.self)
            .subscribe(onNext: { [weak self] _ in
                self?.moveToDetailVC()
            }).disposed(by: rx.disposeBag)
    }

    private func setupDelegate() {
        issueCollectionView.rx.setDelegate(self).disposed(by: rx.disposeBag)
    }
}

//MARK: - Bind
private extension IssueListViewController {
    
    private func bind() {
        bindIssueList()
        bindeSearchController()
    }
    
    private func bindIssueList() {
        viewModel.issuList()
            .drive(issueCollectionView.rx.items(cellIdentifier: IssueCell.identifier, cellType: IssueCell.self)) { _, issue, cell in
                cell.configure(issue.title, issue.comment, milestone: issue.milestone, labels: issue.labels)
            }.disposed(by: rx.disposeBag)
    }
    
    private func bindeSearchController() {
        searchController.searchBar.rx.text
            .orEmpty
            .bind(to: viewModel.searchText)
            .disposed(by: rx.disposeBag)
    }
}

//MARK: - Action
private extension IssueListViewController {
    
    private func setupIssueFilterButton() {
        issueFilterButton.rx.tap
            .subscribe(onNext: { [weak self] in
                self?.moveToFilterVC()
            }).disposed(by: rx.disposeBag)
    }
    
    private func moveToFilterVC() {
        guard let filterVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.issueFilter) else { return }
        present(filterVC, animated: true, completion: nil)
    }
    
    private func moveToDetailVC() {
        guard let detailVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.issueDetail) else { return }
        navigationController?.pushViewController(detailVC, animated: true)
    }
    
    @objc private func refresh() {
        setupSearchController()
        issueCollectionView.refreshControl?.endRefreshing()
    }
}

//MARK: - CollectionViewDelegate
extension IssueListViewController: UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let width = issueCollectionView.frame.width * 0.8
        let height = issueCollectionView.frame.height * 0.3
        return CGSize(width: width, height: height)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)
    }
}
