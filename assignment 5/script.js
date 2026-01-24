function calculate() {
    const num1 = Number(document.getElementById('num1').value);
    const num2 = Number(document.getElementById('num2').value);
    
    const sum = num1 + num2;
    
    let message = "Sum is " + sum;
    if (sum % 2 === 0) {
        message += " (Even)";
    } else {
        message += " (Odd)";
    }
    
    document.getElementById('result').innerText = message;
}
