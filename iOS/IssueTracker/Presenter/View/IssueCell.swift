import UIKit

class IssueCell: UICollectionViewCell {
    
    static let identifier = "IssueCell"
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var commnetLabel: UILabel!
    @IBOutlet weak var milestoneLabel: UILabel!
    @IBOutlet weak var labelStackView: UIStackView!
    
    func configure(_ title:String, _ comment:String, milestone:String, labels:[Label]) {
        self.titleLabel.text = title
        self.commnetLabel.text = comment
        self.milestoneLabel.text = milestone
        for index in 0..<labels.count {
            let label = LabelView()
            let pedding = UIView()
            pedding.translatesAutoresizingMaskIntoConstraints = false
            pedding.widthAnchor.constraint(equalToConstant: 2).isActive = true
            label.configure(labels[index].name, labels[index].color.backgroundColorCode, labels[index].color.textColorCode)
            if labels.count * 2 == labelStackView.subviews.count { continue }
            labelStackView.addArrangedSubview(label)
            labelStackView.addArrangedSubview(pedding)
            
        }
    }
}
