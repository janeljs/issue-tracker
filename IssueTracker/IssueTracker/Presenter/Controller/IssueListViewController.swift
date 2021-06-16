import UIKit
import RxSwift
import RxCocoa
import NSObject_Rx

class IssueListViewController: UIViewController {

    @IBOutlet weak var issueCollectionView: UICollectionView!
    @IBOutlet weak var issueFilterButton: UIButton!
    @IBOutlet weak var newIssueButton: UIButton!
    
    private let viewModel = IssueListViewModel()
    private var labels:[Label]?
    private var mileStone:Set<String> = []
    private var assignee:[Assignee]?
    
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
        setupCollectionView()
        setupButtonAction()
        setupRefreshControl()
    }
    
    private func setupCollectionView() {
        setupDelegate()
        setupCellTouched()
    }
    
    private func setupButtonAction() {
        setupIssueFilterButton()
        setupNewIssueButton()
    }
    
    private func setupIssueFilterButton() {
        issueFilterButton.rx.tap
            .subscribe(onNext: { [weak self] in
                self?.moveToFilterVC()
            }).disposed(by: rx.disposeBag)
    }
    
    private func setupNewIssueButton() {
        newIssueButton.rx.tap
            .subscribe(onNext: { [weak self] in
                self?.moveToCreateIssueVC(nil)
            }).disposed(by: rx.disposeBag)
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
            .subscribe(onNext: { [weak self] data in
                //DetailVC이동 구현
            }).disposed(by: rx.disposeBag)
    }

    private func setupDelegate() {
        issueCollectionView.rx.setDelegate(self).disposed(by: rx.disposeBag)
    }
    
    private func setupFilterInfo(_ labels:[Label], _ milestone:String, _ assignee:[Assignee]) {
        self.labels = labels
        self.mileStone.insert(milestone)
        self.assignee = assignee
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
            .drive(issueCollectionView.rx.items(cellIdentifier: IssueCell.identifier, cellType: IssueCell.self)) { [weak self] _, issue, cell in
                cell.configure(issue.title, issue.comment, milestone: issue.milestone, labels: issue.labels)
                self?.setupFilterInfo(issue.labels, issue.milestone, issue.assignees)
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
    
    private func moveToFilterVC() {
        guard let filterVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.issueFilter) as? FilterIssueViewController else { return }
        if let labels = labels, let assignee = assignee  {
            print(labels, mileStone, assignee)
            filterVC.configure(labels, mileStone, assignee)
        }
        present(filterVC, animated: true, completion: nil)
    }
    
    private func moveToCreateIssueVC(_ issue:IssueInfo?) {
        guard let moveToCreateIssueVC = storyboard?.instantiateViewController(withIdentifier: ViewControllerID.createIssue) as? CreateIssueViewController else { return }
        navigationController?.pushViewController(moveToCreateIssueVC, animated: true)
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

