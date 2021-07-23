import UIKit
import RxSwift
import RxCocoa
import NSObject_Rx

class IssueListViewController: UIViewController {

    @IBOutlet weak var issueCollectionView: UICollectionView!
    @IBOutlet weak var issueFilterButton: UIButton!
    
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
        setupDelegate()
        bind()
    }
}

private extension IssueListViewController {
    
    private func setMainView() {
        setupIssueFilterButton()
        setupRefreshControl()
    }
    
    private func setupIssueFilterButton() {
        issueFilterButton.rx.tap
            .subscribe(onNext: { [weak self] in
                guard let filterVC = self?.storyboard?.instantiateViewController(withIdentifier: ViewControllerID.issueFilter) else { return }
                self?.present(filterVC, animated: true, completion: nil)
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupDelegate() {
        issueCollectionView.rx.setDelegate(self).disposed(by: rx.disposeBag)
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
}

private extension IssueListViewController {
    
    private func bind() {
        bindIssueList()
        bindeSearchController()
    }
    
    private func bindIssueList() {
        viewModel.getIssueList()
        
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

private extension IssueListViewController {
    
    @objc private func refresh() {
        setupSearchController()
        issueCollectionView.refreshControl?.endRefreshing()
    }
}

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
