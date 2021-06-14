import UIKit

class FilterCell: UITableViewCell {
    
    static let identifier = "FilterCell"
    
    private lazy var contentLabel: UILabel = {
        let label = UILabel(frame: .zero)
        return label
    }()
    
    private lazy var selectedCheck: UIButton = {
        let button = UIButton(frame: .zero)
        button.tintColor = .systemGreen
        button.setImage(UIImage(systemName: "checkmark.circle.fill"), for: .normal)
        return button
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupSubViews()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupSubViews()
    }
    
    func configure(_ text:String) {
        contentLabel.text = text
    }
    
    override var isSelected: Bool {
        didSet {
            if isSelected {
                contentLabel.font = UIFont.boldSystemFont(ofSize: contentLabel.font.pointSize)
                selectedCheck.isHidden = false
            } else {
                contentLabel.font = .none
                selectedCheck.isHidden = true
            }
        }
    }
}

//MARK: - Setup Contraints
private extension FilterCell {
    
    private func setupSubViews() {
        setupContentLabel()
        setupSelectedView()
    }
    
    private func setupContentLabel() {
        addSubview(contentLabel)
        contentLabel.translatesAutoresizingMaskIntoConstraints = false
        contentLabel.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.5).isActive = true
        contentLabel.heightAnchor.constraint(equalTo: heightAnchor).isActive = true
        contentLabel.centerYAnchor.constraint(equalTo: centerYAnchor).isActive = true
        contentLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 10).isActive = true
    }
    
    private func setupSelectedView() {
        addSubview(selectedCheck)
        selectedCheck.translatesAutoresizingMaskIntoConstraints = false
        selectedCheck.widthAnchor.constraint(equalTo: widthAnchor, multiplier: 0.2).isActive = true
        selectedCheck.heightAnchor.constraint(equalTo: heightAnchor).isActive = true
        selectedCheck.centerYAnchor.constraint(equalTo: centerYAnchor).isActive = true
        selectedCheck.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -10).isActive = true
        selectedCheck.isHidden = true
    }
}
