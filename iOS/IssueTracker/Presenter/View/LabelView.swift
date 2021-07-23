import UIKit

class LabelView: UILabel {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupMainView()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupMainView()
    }
    
    func configure(_ text:String, _ backgroundHex:String, _ textHex:String) {
        self.text = text
        backgroundColor = colorWithHexString(backgroundHex)
    }
}

private extension LabelView {
    
    private func setupMainView() {
        layer.masksToBounds = true
        layer.cornerRadius = 10
        textAlignment = .center
        textColor = .white
    }
}

//MARK: - HexString To UIColor
private extension LabelView {
    
    private func colorWithHexString(_ hex:String) -> UIColor {
        var colorString = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        colorString = colorString.replacingOccurrences(of: "#", with: "").uppercased()
        
        let alpha:CGFloat = 1.0
        let red:CGFloat = colorComponentFrom(colorString: colorString, start: 0, length: 2)
        let green:CGFloat = colorComponentFrom(colorString: colorString, start: 2, length: 2)
        let blue:CGFloat = colorComponentFrom(colorString: colorString, start: 4, length: 2)
        
        let color = UIColor(red: red, green: green, blue: blue, alpha: alpha)
        return color
    }
    
    private func colorComponentFrom(colorString: String, start: Int, length: Int) -> CGFloat {
        let startIndex = colorString.index(colorString.startIndex, offsetBy: start)
            let endIndex = colorString.index(startIndex, offsetBy: length)
            let subString = colorString[startIndex..<endIndex]
            let fullHexString = length == 2 ? subString : "\(subString)\(subString)"
            var hexComponent: UInt64 = 0

            guard Scanner(string: String(fullHexString)).scanHexInt64(&hexComponent) else {
                return 0
            }
            let hexFloat: CGFloat = CGFloat(hexComponent)
            let floatValue: CGFloat = CGFloat(hexFloat / 255.0)
            return floatValue
    }
}
